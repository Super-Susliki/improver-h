import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Store } from '@prisma/client';
import { EvmProviderService } from 'src/blockchain/evm/evm-provider.service';
import { PrismaService } from 'src/data-access';
import { QueueService } from 'src/queue/queue.service';
import { storeWithHashedId } from 'src/utils/store';
import { Address, verifyMessage } from 'viem';

@Injectable()
export class MerchantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly evmProvider: EvmProviderService,
    private readonly queueService: QueueService,
  ) {}

  async getMerchantStores(userId: string): Promise<Store[]> {
    const userStores = await this.prisma.userStore.findMany({
      where: {
        AND: [
          { isMerchant: true },
          {
            user: {
              id: userId,
              roles: { has: 'MERCHANT_USER' },
            },
          },
        ],
      },
      include: {
        store: true,
      },
    });

    return userStores.map((store) => store.store);
  }

  async grantBonusesToUser({
    userId,
    userAddress,
    merchantId,
    storeId,
    bonusesAmount,
    signature,
    challengeId,
    merchantAddress,
  }: {
    userId: string;
    userAddress: Address;
    merchantId: string;
    storeId: string;
    bonusesAmount: number;
    signature: `0x${string}`;
    challengeId: string;
    merchantAddress: Address;
  }) {
    await this.validateSignature({
      challengeId,
      signature,
      userId,
      storeId,
      merchantId,
      merchantAddress,
    });

    return await this.prisma.$transaction(async (tx) => {
      const store = await tx.store.findUnique({
        where: { id: storeId },
      });

      if (!store) {
        throw new NotFoundException(`Store with id ${storeId} not found`);
      }

      const merchantStore = await tx.userStore.findUnique({
        where: {
          userId_storeId_isMerchant: {
            userId: merchantId,
            storeId,
            isMerchant: true,
          },
        },
      });

      if (!merchantStore) {
        throw new NotFoundException(
          `User is not a merchant for a provided store`,
        );
      }

      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }

      let userStore = await tx.userStore.findUnique({
        where: {
          userId_storeId_isMerchant: {
            userId,
            storeId,
            isMerchant: false,
          },
        },
      });

      if (!userStore) {
        userStore = await tx.userStore.create({
          data: {
            userId,
            storeId,
            isMerchant: false,
            bonusesAmount,
          },
        });
      } else {
        userStore = await tx.userStore.update({
          where: {
            userId_storeId_isMerchant: { userId, storeId, isMerchant: false },
          },
          data: { bonusesAmount: { increment: bonusesAmount } },
        });
      }

      const signatureEntity = await tx.merchantSignature.create({
        data: {
          userId,
          storeId,
          isMerchant: false,
          signature,
        },
      });

      const queueData = {
        merchant: merchantAddress,
        user: userAddress,
        storeId: storeWithHashedId(store).idHash,
        signature,
        signatureId: signatureEntity.id,
      };

      const fnToQueue = this.pushSignatureCreationToQueue.bind(this);

      this.queueService.addJob(queueData, fnToQueue);

      return userStore;
    });
  }

  private async pushSignatureCreationToQueue({
    user,
    storeId,
    signature,
    merchant,
    signatureId,
  }: {
    user: Address;
    storeId: `0x${string}`;
    signature: `0x${string}`;
    merchant: Address;
    signatureId: string;
  }) {
    const txHash = await this.evmProvider.pushSignatureOnchain({
      user,
      storeId,
      signature,
      merchant,
    });

    await this.prisma.merchantSignature.update({
      where: { id: signatureId },
      data: { txHash },
    });
  }

  private async validateSignature({
    challengeId,
    signature,
    userId,
    storeId,
    merchantId,
    merchantAddress,
  }: {
    challengeId: string;
    userId: string;
    storeId: string;
    merchantId: string;
    signature: `0x${string}`;
    merchantAddress: Address;
  }) {
    const str = `${challengeId}-${userId}-${storeId}-${merchantId}`;

    const valid = await verifyMessage({
      address: merchantAddress,
      message: str,
      signature,
    });

    if (!valid) {
      throw new BadRequestException('Invalid signature');
    }
  }
}

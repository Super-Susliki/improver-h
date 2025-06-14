import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Store } from '@prisma/client';
import { PrismaService } from 'src/data-access';
import { Address, verifyMessage } from 'viem';

@Injectable()
export class MerchantsService {
  constructor(private readonly prisma: PrismaService) {}

  async getMerchantStores(userId: string): Promise<Store[]> {
    const stores = await this.prisma.store.findMany({
      where: {
        users: {
          some: {
            user: {
              id: userId,
              roles: { has: 'MERCHANT_USER' },
            },
          },
        },
      },
    });

    return stores;
  }

  async grantBonusesToUser({
    userId,
    merchantId,
    storeId,
    bonusesAmount,
    signature,
    challengeId,
    merchantAddress,
  }: {
    userId: string;
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

      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
      let userStore = await tx.userStore.findUnique({
        where: {
          userId_storeId: { userId, storeId },
        },
      });

      if (!userStore) {
        userStore = await tx.userStore.create({
          data: {
            userId,
            storeId,
            bonusesAmount,
          },
        });
      } else {
        userStore = await tx.userStore.update({
          where: { userId_storeId: { userId, storeId } },
          data: { bonusesAmount: userStore.bonusesAmount + bonusesAmount },
        });
      }

      // TODO: save to contracts
      await tx.merchantSignature.create({
        data: {
          userId: merchantId,
          storeId,
          signature,
        },
      });

      return userStore;
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

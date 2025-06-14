import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  LoyaltyReward,
  RewardRedemption,
  RewardType,
  RedemptionStatus,
} from '@prisma/client';
import { PrismaService } from 'src/data-access';

import { CreateLoyaltyRewardDto } from './dtos/create-loyalty-reward.dto';
import { RedeemRewardDto } from './dtos/redeem-reward.dto';

export interface LoyaltyStats {
  totalPoints: number;
  availableRewards: LoyaltyReward[];
  recentRedemptions: (RewardRedemption & { reward: LoyaltyReward })[];
  nextReward?: {
    reward: LoyaltyReward;
    pointsNeeded: number;
  };
}

@Injectable()
export class LoyaltyService {
  constructor(private readonly prisma: PrismaService) {}

  async createReward(
    storeId: string,
    merchantId: string,
    data: CreateLoyaltyRewardDto,
  ): Promise<LoyaltyReward> {
    // Verify merchant owns the store
    const merchantStore = await this.prisma.userStore.findUnique({
      where: {
        userId_storeId_isMerchant: {
          userId: merchantId,
          storeId,
          isMerchant: true,
        },
      },
    });

    if (!merchantStore) {
      throw new BadRequestException('You are not a merchant for this store');
    }

    return this.prisma.loyaltyReward.create({
      data: {
        storeId,
        name: data.name,
        description: data.description,
        type: data.type,
        value: data.value,
        pointsRequired: data.pointsRequired,
        maxRedemptions: data.maxRedemptions,
      },
    });
  }

  async getStoreRewards(storeId: string): Promise<LoyaltyReward[]> {
    return this.prisma.loyaltyReward.findMany({
      where: {
        storeId,
        isActive: true,
      },
      orderBy: {
        pointsRequired: 'asc',
      },
    });
  }

  async getUserLoyaltyStats(
    userId: string,
    storeId: string,
  ): Promise<LoyaltyStats> {
    // Get user's points for this store
    const userStore = await this.prisma.userStore.findUnique({
      where: {
        userId_storeId_isMerchant: {
          userId,
          storeId,
          isMerchant: false,
        },
      },
    });

    const totalPoints = userStore?.bonusesAmount || 0;

    // Get available rewards (user has enough points)
    const allRewards = await this.getStoreRewards(storeId);
    const availableRewards = allRewards.filter(
      (reward) =>
        totalPoints >= reward.pointsRequired &&
        (reward.maxRedemptions === null ||
          reward.currentRedemptions < reward.maxRedemptions),
    );

    // Get recent redemptions
    const recentRedemptions = await this.prisma.rewardRedemption.findMany({
      where: {
        userId,
        storeId,
      },
      include: {
        reward: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    // Find next achievable reward
    const unachievableRewards = allRewards.filter(
      (reward) => totalPoints < reward.pointsRequired,
    );
    const nextReward =
      unachievableRewards.length > 0
        ? {
            reward: unachievableRewards[0],
            pointsNeeded: unachievableRewards[0].pointsRequired - totalPoints,
          }
        : undefined;

    return {
      totalPoints,
      availableRewards,
      recentRedemptions,
      nextReward,
    };
  }

  async redeemReward(
    userId: string,
    storeId: string,
    data: RedeemRewardDto,
  ): Promise<RewardRedemption> {
    return this.prisma.$transaction(async (tx) => {
      // Get reward details
      const reward = await tx.loyaltyReward.findUnique({
        where: { id: data.rewardId },
      });

      if (!reward || reward.storeId !== storeId) {
        throw new NotFoundException('Reward not found');
      }

      if (!reward.isActive) {
        throw new BadRequestException('Reward is not active');
      }

      // Check if reward has redemption limit
      if (
        reward.maxRedemptions !== null &&
        reward.currentRedemptions >= reward.maxRedemptions
      ) {
        throw new BadRequestException('Reward redemption limit reached');
      }

      // Get user's current points
      const userStore = await tx.userStore.findUnique({
        where: {
          userId_storeId_isMerchant: {
            userId,
            storeId,
            isMerchant: false,
          },
        },
      });

      if (!userStore || userStore.bonusesAmount < reward.pointsRequired) {
        throw new BadRequestException('Insufficient points');
      }

      // Deduct points
      await tx.userStore.update({
        where: {
          userId_storeId_isMerchant: {
            userId,
            storeId,
            isMerchant: false,
          },
        },
        data: {
          bonusesAmount: {
            decrement: reward.pointsRequired,
          },
        },
      });

      // Update reward redemption count
      await tx.loyaltyReward.update({
        where: { id: reward.id },
        data: {
          currentRedemptions: {
            increment: 1,
          },
        },
      });

      // Create redemption record
      return tx.rewardRedemption.create({
        data: {
          userId,
          storeId,
          rewardId: reward.id,
          pointsUsed: reward.pointsRequired,
          status: RedemptionStatus.PENDING,
        },
        include: {
          reward: true,
        },
      });
    });
  }

  async updateRedemptionStatus(
    redemptionId: string,
    merchantId: string,
    status: RedemptionStatus,
  ): Promise<RewardRedemption> {
    const redemption = await this.prisma.rewardRedemption.findUnique({
      where: { id: redemptionId },
      include: { store: true },
    });

    if (!redemption) {
      throw new NotFoundException('Redemption not found');
    }

    // Verify merchant owns the store
    const merchantStore = await this.prisma.userStore.findUnique({
      where: {
        userId_storeId_isMerchant: {
          userId: merchantId,
          storeId: redemption.storeId,
          isMerchant: true,
        },
      },
    });

    if (!merchantStore) {
      throw new BadRequestException('You are not a merchant for this store');
    }

    return this.prisma.rewardRedemption.update({
      where: { id: redemptionId },
      data: { status },
      include: {
        reward: true,
        user: true,
      },
    });
  }

  async getMerchantRedemptions(
    merchantId: string,
    storeId: string,
  ): Promise<RewardRedemption[]> {
    // Verify merchant owns the store
    const merchantStore = await this.prisma.userStore.findUnique({
      where: {
        userId_storeId_isMerchant: {
          userId: merchantId,
          storeId,
          isMerchant: true,
        },
      },
    });

    if (!merchantStore) {
      throw new BadRequestException('You are not a merchant for this store');
    }

    return this.prisma.rewardRedemption.findMany({
      where: { storeId },
      include: {
        reward: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateReward(
    rewardId: string,
    merchantId: string,
    data: Partial<CreateLoyaltyRewardDto>,
  ): Promise<LoyaltyReward> {
    const reward = await this.prisma.loyaltyReward.findUnique({
      where: { id: rewardId },
    });

    if (!reward) {
      throw new NotFoundException('Reward not found');
    }

    // Verify merchant owns the store
    const merchantStore = await this.prisma.userStore.findUnique({
      where: {
        userId_storeId_isMerchant: {
          userId: merchantId,
          storeId: reward.storeId,
          isMerchant: true,
        },
      },
    });

    if (!merchantStore) {
      throw new BadRequestException('You are not a merchant for this store');
    }

    return this.prisma.loyaltyReward.update({
      where: { id: rewardId },
      data,
    });
  }

  async deleteReward(rewardId: string, merchantId: string): Promise<void> {
    const reward = await this.prisma.loyaltyReward.findUnique({
      where: { id: rewardId },
    });

    if (!reward) {
      throw new NotFoundException('Reward not found');
    }

    // Verify merchant owns the store
    const merchantStore = await this.prisma.userStore.findUnique({
      where: {
        userId_storeId_isMerchant: {
          userId: merchantId,
          storeId: reward.storeId,
          isMerchant: true,
        },
      },
    });

    if (!merchantStore) {
      throw new BadRequestException('You are not a merchant for this store');
    }

    await this.prisma.loyaltyReward.update({
      where: { id: rewardId },
      data: { isActive: false },
    });
  }

  async awardPoints(
    userId: string,
    storeId: string,
    merchantId: string,
    points: number,
  ): Promise<{ newTotal: number }> {
    // Verify merchant owns the store
    const merchantStore = await this.prisma.userStore.findUnique({
      where: {
        userId_storeId_isMerchant: {
          userId: merchantId,
          storeId,
          isMerchant: true,
        },
      },
    });

    if (!merchantStore) {
      throw new BadRequestException('You are not a merchant for this store');
    }

    if (points <= 0) {
      throw new BadRequestException('Points must be greater than 0');
    }

    // Update user's points
    const userStore = await this.prisma.userStore.upsert({
      where: {
        userId_storeId_isMerchant: {
          userId,
          storeId,
          isMerchant: false,
        },
      },
      create: {
        userId,
        storeId,
        isMerchant: false,
        bonusesAmount: points,
      },
      update: {
        bonusesAmount: {
          increment: points,
        },
      },
    });

    return { newTotal: userStore.bonusesAmount };
  }

  async getUserRedemptions(userId: string): Promise<RewardRedemption[]> {
    return this.prisma.rewardRedemption.findMany({
      where: { userId },
      include: {
        reward: true,
        store: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getUserStoreRedemptions(
    userId: string,
    storeId: string,
  ): Promise<RewardRedemption[]> {
    return this.prisma.rewardRedemption.findMany({
      where: {
        userId,
        storeId,
      },
      include: {
        reward: true,
        store: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

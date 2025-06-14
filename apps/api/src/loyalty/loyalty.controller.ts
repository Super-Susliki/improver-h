import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LoyaltyReward } from '@prisma/client';

import {
  RequestUser,
  UserClaims,
} from '../auth/decorators/request-user.decorator';
import { PrivyAuthGuard } from '../auth/guards/privy-auth.guard';
import { LoyaltyService } from './loyalty.service';
import { CreateLoyaltyRewardDto } from './dtos/create-loyalty-reward.dto';
import { RedeemRewardDto } from './dtos/redeem-reward.dto';
import { UpdateRedemptionStatusDto } from './dtos/update-redemption-status.dto';
import { AwardPointsDto } from './dtos/award-points.dto';

@ApiTags('Loyalty')
@Controller('loyalty')
@UseGuards(PrivyAuthGuard)
@ApiBearerAuth()
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Get('stores/:storeId/rewards')
  @ApiOperation({ summary: 'Get rewards for a store' })
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  async getStoreRewards(@Param('storeId') storeId: string) {
    return this.loyaltyService.getStoreRewards(storeId);
  }

  @Post('stores/:storeId/rewards')
  @ApiOperation({ summary: 'Create a new reward (merchant only)' })
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  @ApiBody({ type: CreateLoyaltyRewardDto })
  async createReward(
    @Param('storeId') storeId: string,
    @RequestUser() user: UserClaims,
    @Body() createRewardDto: CreateLoyaltyRewardDto,
  ): Promise<LoyaltyReward> {
    return this.loyaltyService.createReward(
      storeId,
      user.dbUser!.id,
      createRewardDto,
    );
  }

  @Get('stores/:storeId/my-stats')
  @ApiOperation({ summary: 'Get user loyalty stats for a store' })
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  async getUserLoyaltyStats(
    @Param('storeId') storeId: string,
    @RequestUser() user: UserClaims,
  ) {
    return this.loyaltyService.getUserLoyaltyStats(user.dbUser!.id, storeId);
  }

  @Get('users/me/redemptions')
  @ApiOperation({ summary: 'Get user redemption history across all stores' })
  async getUserRedemptions(@RequestUser() user: UserClaims) {
    return this.loyaltyService.getUserRedemptions(user.dbUser!.id);
  }

  @Get('stores/:storeId/my-redemptions')
  @ApiOperation({ summary: 'Get user redemption history for a specific store' })
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  async getUserStoreRedemptions(
    @Param('storeId') storeId: string,
    @RequestUser() user: UserClaims,
  ) {
    return this.loyaltyService.getUserStoreRedemptions(
      user.dbUser!.id,
      storeId,
    );
  }

  @Post('stores/:storeId/redeem')
  @ApiOperation({ summary: 'Redeem a reward' })
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  @ApiBody({ type: RedeemRewardDto })
  async redeemReward(
    @Param('storeId') storeId: string,
    @RequestUser() user: UserClaims,
    @Body() redeemDto: RedeemRewardDto,
  ) {
    return this.loyaltyService.redeemReward(
      user.dbUser!.id,
      storeId,
      redeemDto,
    );
  }

  @Get('merchants/stores/:storeId/redemptions')
  @ApiOperation({ summary: 'Get redemptions for a store (merchant only)' })
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  async getMerchantRedemptions(
    @Param('storeId') storeId: string,
    @RequestUser() user: UserClaims,
  ) {
    return this.loyaltyService.getMerchantRedemptions(user.dbUser!.id, storeId);
  }

  @Put('redemptions/:redemptionId/status')
  @ApiOperation({ summary: 'Update redemption status (merchant only)' })
  @ApiParam({ name: 'redemptionId', description: 'Redemption ID' })
  @ApiBody({ type: UpdateRedemptionStatusDto })
  async updateRedemptionStatus(
    @Param('redemptionId') redemptionId: string,
    @RequestUser() user: UserClaims,
    @Body() updateDto: UpdateRedemptionStatusDto,
  ) {
    return this.loyaltyService.updateRedemptionStatus(
      redemptionId,
      user.dbUser!.id,
      updateDto.status,
    );
  }

  @Put('rewards/:rewardId')
  @ApiOperation({ summary: 'Update a reward (merchant only)' })
  @ApiParam({ name: 'rewardId', description: 'Reward ID' })
  @ApiBody({ type: CreateLoyaltyRewardDto })
  async updateReward(
    @Param('rewardId') rewardId: string,
    @RequestUser() user: UserClaims,
    @Body() updateRewardDto: Partial<CreateLoyaltyRewardDto>,
  ) {
    return this.loyaltyService.updateReward(
      rewardId,
      user.dbUser!.id,
      updateRewardDto,
    );
  }

  @Delete('rewards/:rewardId')
  @ApiOperation({ summary: 'Delete a reward (merchant only)' })
  @ApiParam({ name: 'rewardId', description: 'Reward ID' })
  async deleteReward(
    @Param('rewardId') rewardId: string,
    @RequestUser() user: UserClaims,
  ) {
    await this.loyaltyService.deleteReward(rewardId, user.dbUser!.id);
    return { success: true };
  }

  @Post('stores/:storeId/award-points')
  @ApiOperation({ summary: 'Award points to a user (merchant only)' })
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  @ApiBody({ type: AwardPointsDto })
  async awardPoints(
    @Param('storeId') storeId: string,
    @RequestUser() user: UserClaims,
    @Body() awardPointsDto: AwardPointsDto,
  ) {
    return this.loyaltyService.awardPoints(
      awardPointsDto.userId,
      storeId,
      user.dbUser!.id,
      awardPointsDto.points,
    );
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RedeemRewardDto {
  @ApiProperty({ description: 'ID of the reward to redeem' })
  @IsString()
  rewardId: string;
}

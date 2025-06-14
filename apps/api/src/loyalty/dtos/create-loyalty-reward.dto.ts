import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { RewardType } from '@prisma/client';

export class CreateLoyaltyRewardDto {
  @ApiProperty({ description: 'Reward name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Reward description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Reward type', enum: RewardType })
  @IsEnum(RewardType)
  type: RewardType;

  @ApiProperty({ description: 'Reward value (percentage, fixed amount, etc.)' })
  @IsNumber()
  @Min(0)
  value: number;

  @ApiProperty({ description: 'Points required to redeem this reward' })
  @IsNumber()
  @Min(1)
  pointsRequired: number;

  @ApiProperty({
    description: 'Maximum number of redemptions allowed',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxRedemptions?: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RedemptionStatus } from '@prisma/client';

export class UpdateRedemptionStatusDto {
  @ApiProperty({
    description: 'New status for the redemption',
    enum: RedemptionStatus,
  })
  @IsEnum(RedemptionStatus)
  status: RedemptionStatus;
}

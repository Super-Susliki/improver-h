import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class AwardPointsDto {
  @ApiProperty({ description: 'ID of the user to award points to' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Number of points to award', minimum: 1 })
  @IsNumber()
  @Min(1)
  points: number;
}

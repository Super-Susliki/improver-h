import { ApiProperty } from '@nestjs/swagger';

export class GrantBonusesToUserRequestDto {
  @ApiProperty({
    description: 'The user id to grant bonuses to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;

  @ApiProperty({
    description: 'The number of bonuses to grant',
    example: 100,
    required: false,
  })
  bonusesAmount: number;

  @ApiProperty({
    description: 'The signature of the merchant',
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  signature: string;
}

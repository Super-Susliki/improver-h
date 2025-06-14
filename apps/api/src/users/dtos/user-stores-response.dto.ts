import { ApiProperty } from '@nestjs/swagger';

export class UserStoresResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the store',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The unique identifier of the store',
    example: '0x123e4567e89b12d3a456426614174000',
  })
  idHash: string;

  @ApiProperty({
    description: 'The name of the store',
    example: 'My Awesome Store',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the store',
    example: 'A store that sells awesome products',
    required: false,
  })
  description?: string | null;

  @ApiProperty({
    description: 'URL to the store logo',
    example: 'https://example.com/logo.png',
    required: false,
  })
  logoUrl?: string | null;

  @ApiProperty({
    description: 'URL to the store banner',
    example: 'https://example.com/banner.png',
    required: false,
  })
  bannerUrl?: string | null;

  @ApiProperty({
    description: 'URL to the store website',
    example: 'https://example.com',
    required: false,
  })
  websiteUrl?: string | null;

  @ApiProperty({
    description: 'The number of bonuses available for the store',
    example: 100,
  })
  bonusesAmount: number;

  @ApiProperty({
    description: 'The date when the store was created',
    example: '2024-03-20T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the store was last updated',
    example: '2024-03-20T12:00:00Z',
  })
  updatedAt: Date;
}

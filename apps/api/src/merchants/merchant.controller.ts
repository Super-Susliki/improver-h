import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  RequestUser,
  UserClaims,
} from '../auth/decorators/request-user.decorator';
import { PrivyAuthGuard } from '../auth/guards/privy-auth.guard';

import { GrantBonusesToUserRequestDto } from './dtos/grant-bonuses-to-user.dto';
import { MerchantResponseDto } from './dtos/merchant-stores-response.dto';
import { MerchantsService } from './merchants.service';

@ApiTags('Merchants')
@Controller('merchants')
@UseGuards(PrivyAuthGuard)
@ApiBearerAuth()
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Get('me/stores')
  @ApiOperation({ summary: 'Get current merchant stores' })
  @ApiResponse({
    status: 200,
    description: 'The merchant stores have been successfully retrieved',
    type: [MerchantResponseDto],
  })
  async getMerchantStores(
    @RequestUser() user: UserClaims,
  ): Promise<MerchantResponseDto[]> {
    const stores = await this.merchantsService.getMerchantStores(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user.dbUser!.id,
    );
    return stores;
  }

  @Post('me/stores/:storeId/bonuses')
  @ApiOperation({ summary: 'Grant bonuses to a store' })
  @ApiResponse({
    status: 200,
    description: 'The bonuses have been successfully granted',
  })
  async grantBonusesToStore(
    @Param('storeId') storeId: string,
    @RequestUser() user: UserClaims,
    @Body() body: GrantBonusesToUserRequestDto,
  ) {
    await this.merchantsService.grantBonusesToUser({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      merchantId: user.dbUser!.id,
      storeId,
      signature: body.signature,
      userId: body.userId,
      bonusesAmount: body.bonusesAmount,
    });
  }
}

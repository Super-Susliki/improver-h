import { Module } from '@nestjs/common';

import { MerchantsController } from './merchant.controller';
import { MerchantsService } from './merchants.service';

@Module({
  controllers: [MerchantsController],
  providers: [MerchantsService],
  exports: [MerchantsService],
})
export class MerchantsModule {}

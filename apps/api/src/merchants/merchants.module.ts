import { Module } from '@nestjs/common';
import { EvmProviderModule } from 'src/blockchain/evm/evm-provider.module';
import { QueueModule } from 'src/queue/queue.module';

import { MerchantsController } from './merchant.controller';
import { MerchantsService } from './merchants.service';

@Module({
  imports: [QueueModule, EvmProviderModule],
  controllers: [MerchantsController],
  providers: [MerchantsService],
  exports: [MerchantsService],
})
export class MerchantsModule {}

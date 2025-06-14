import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  EvmProviderService,
  PRIVATE_KEY,
  RPC_URL,
} from './evm-provider.service';

@Module({
  imports: [],
  providers: [
    {
      provide: RPC_URL,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<string | undefined>('blockchain.rpcUrl');
      },
    },
    {
      provide: PRIVATE_KEY,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<string | undefined>('blockchain.privateKey');
      },
    },
    EvmProviderService,
  ],
  exports: [EvmProviderService],
})
export class EvmProviderModule {}

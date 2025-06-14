import { Module } from '@nestjs/common';
import { DataAccessModule } from 'src/data-access';

import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

@Module({
  imports: [DataAccessModule],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService],
})
export class StoresModule {}

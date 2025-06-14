import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Store } from '@prisma/client';

import { PrivyAuthGuard } from '../auth/guards/privy-auth.guard';

import { StoresService } from './stores.service';
import { storeWithHashedId } from 'src/utils/store';

@ApiTags('Stores')
@Controller('stores')
@UseGuards(PrivyAuthGuard)
@ApiBearerAuth()
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get store by ID' })
  @ApiResponse({
    status: 200,
    description: 'The store has been successfully retrieved',
  })
  async getStoreById(@Param('id') id: string): Promise<Store> {
    return storeWithHashedId(await this.storesService.findById(id));
  }

  @Get()
  @ApiOperation({ summary: 'Get all stores' })
  @ApiResponse({
    status: 200,
    description: 'All stores have been successfully retrieved',
  })
  async getAllStores(): Promise<Store[]> {
    return this.storesService.findAll();
  }
}

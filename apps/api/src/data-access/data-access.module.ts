import { Global, Module } from '@nestjs/common';

import { PrismaService } from './adapters/prisma.service';
import { PrismaUserRepository } from './adapters/user.repository';

@Global()
@Module({
  providers: [PrismaService, PrismaUserRepository],
  exports: [PrismaService, PrismaUserRepository],
})
export class DataAccessModule {}

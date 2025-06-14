import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import appConfig from './config/configuration';
import { validateEnv } from './config/env.schema';
import { DataAccessModule } from './data-access/data-access.module';
import { GlobalGuard } from './guards/global.guard';
import { LoggerModule } from './logger/logger.module';
import { MerchantsModule } from './merchants/merchants.module';
import { QueueModule } from './queue/queue.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DataAccessModule,
    LoggerModule.forRoot({ global: true }),

    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env.local', '.env'],
      validate: () => validateEnv(),
    }),

    // HTTP client
    HttpModule,

    // Auth
    AuthModule.forRoot(),

    // Users
    UsersModule,

    // Merchants
    MerchantsModule,

    // Queue
    QueueModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GlobalGuard,
    },
  ],
})
export class AppModule {}

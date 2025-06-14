import type { INestApplication } from '@nestjs/common';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { LoggerErrorInterceptor, Logger as PinoLogger } from 'nestjs-pino';

import { AppModule } from './app.module';

function setupSwagger<T>(app: INestApplication<T>, prefix: string) {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API for the project')
    .setVersion('1.0')
    .addCookieAuth('privy-id-token')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/swagger`, app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Keep auth token after reload
      withCredentials: true, // Ensures cookies are sent with request
    },
  });
}

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
      bufferLogs: true,
    });

    const configService = app.get(ConfigService);
    const isProduction = configService.get('app.nodeEnv') === 'production';

    app.use(helmet());

    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );

    app.useLogger(await app.get(PinoLogger));
    app.useGlobalInterceptors(new LoggerErrorInterceptor());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    app.use(cookieParser(configService.get<string>('app.cookieSecret')));

    const corsOrigins = configService
      .getOrThrow<string>('app.corsOrigins')
      .split(',')
      .map((origin) => origin.trim());

    Logger.log(`🔒 CORS Origins: ${corsOrigins.join(', ')}`);

    app.enableCors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check if the origin is in our allowed list
        if (corsOrigins.includes(origin) || corsOrigins.includes('*')) {
          return callback(null, true);
        }

        // In development, be more permissive
        if (
          !isProduction &&
          (origin.includes('localhost') || origin.includes('127.0.0.1'))
        ) {
          return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'), false);
      },
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Accept',
        'Authorization',
        'Content-Type',
        'X-Requested-With',
        'Range',
        'X-Request-ID',
        'X-Cloud-Trace-Context',
        'Cookie',
        'challenge-id',
      ],
      exposedHeaders: ['X-Request-ID'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
      maxAge: isProduction ? 86400 : 0, // Cache preflight for 24 hours in production
    });

    const globalPrefix = configService.getOrThrow<string>('app.apiPrefix');
    app.setGlobalPrefix(globalPrefix);
    setupSwagger(app, globalPrefix);

    const port = configService.getOrThrow<number>('app.port');
    await app.listen(port, '0.0.0.0'); // Listen on all interfaces for deployment

    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
    Logger.log(
      `🚀 Swagger is running on: http://localhost:${port}/${globalPrefix}/swagger`,
    );
    Logger.log(
      `🌍 Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`,
    );

    const signals = ['SIGTERM', 'SIGINT'];
    for (const signal of signals) {
      process.on(signal, async () => {
        Logger.log(`Received ${signal}, shutting down...`, 'Bootstrap');
        await app.close();
        Logger.log('Application shutdown complete', 'Bootstrap');
        process.exit(0);
      });
    }
  } catch (error) {
    console.error(`Error during bootstrap: ${error.message}`, 'Bootstrap');
    process.exit(1);
  }
}

bootstrap();

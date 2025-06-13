import {
  ClassSerializerInterceptor,
  INestApplication,
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
      .split(',');
    app.enableCors({
      origin: corsOrigins,
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });

    const globalPrefix = configService.getOrThrow<string>('app.apiPrefix');
    app.setGlobalPrefix(globalPrefix);
    setupSwagger(app, globalPrefix);

    const port = configService.getOrThrow<number>('app.port');
    await app.listen(port);
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
    Logger.log(
      `🚀 Swagger is running on: http://localhost:${port}/${globalPrefix}/swagger`,
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

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrivyClient } from '@privy-io/server-auth';
import { Request } from 'express';

import { PrismaService } from '../../data-access/adapters/prisma.service';
import { isPublic } from '../decorators/is-public.decorator';

export const UsePrivyAuthGuard = () => UseGuards(PrivyAuthGuard);

@Injectable()
export class PrivyAuthGuard implements CanActivate {
  private readonly logger = new Logger(PrivyAuthGuard.name);

  constructor(
    private readonly privyClient: PrivyClient,
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (isPublic(context, this.reflector)) return true;

    const request = context.switchToHttp().getRequest<Request>();

    // Log request details for debugging
    this.logger.debug(`🔍 Auth check for ${request.method} ${request.url}`);
    this.logger.debug(
      `🍪 Available cookies: ${Object.keys(request.cookies).join(', ')}`,
    );
    this.logger.debug(`🌐 Origin: ${request.headers.origin}`);
    this.logger.debug(`🔑 User-Agent: ${request.headers['user-agent']}`);

    const idToken =
      request.cookies['privy-token'] ??
      request.cookies['privy-id-token'] ??
      (request.headers.authorization?.startsWith('Bearer ')
        ? request.headers.authorization.replace('Bearer ', '')
        : undefined);

    if (!idToken) {
      this.logger.warn(
        '❌ No authentication token found in cookies or headers',
      );
      this.logger.debug(
        `🔍 Available cookies: ${JSON.stringify(request.cookies)}`,
      );
      throw new UnauthorizedException(
        'Authentication token is required. Please log in again.',
      );
    }

    try {
      this.logger.debug('🔐 Verifying Privy token...');
      const verifiedClaims = await this.privyClient.verifyAuthToken(idToken);
      this.logger.debug(`✅ Token verified for user: ${verifiedClaims.userId}`);

      const user = await this.privyClient.getUserById(verifiedClaims.userId);
      this.logger.debug(`👤 Retrieved user: ${user.id}`);

      let dbUser = await this.prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!dbUser) {
        this.logger.debug('👤 User not found in database, creating...');
        dbUser = await this.prisma.user.create({
          data: {
            id: user.id,
            walletAddress: user.wallet?.address ?? '',
            email: user.email?.address ?? '',
          },
        });
        this.logger.debug(`✅ Created user in database: ${dbUser.id}`);
      }

      if (!user.wallet && !user.email) {
        this.logger.warn(
          `❌ User ${user.id} has no wallet or email authentication`,
        );
        throw new UnauthorizedException(
          'User must have either email or wallet authentication',
        );
      }

      // Attach the user to the request object for use in controllers
      (request as any)['user'] = {
        externalUser: user,
        dbUser,
      };

      this.logger.debug(`✅ Authentication successful for user: ${user.id}`);
      return true;
    } catch (error) {
      this.logger.error(`❌ Authentication error:`, error);

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      // Provide more specific error messages based on the error type
      if (error.message?.includes('Invalid token')) {
        throw new UnauthorizedException(
          'Authentication token is invalid or expired. Please log in again.',
        );
      }

      if (
        error.message?.includes('network') ||
        error.message?.includes('ENOTFOUND')
      ) {
        throw new UnauthorizedException(
          'Unable to verify authentication. Please try again.',
        );
      }

      throw new UnauthorizedException(
        'Authentication failed. Please log in again.',
      );
    }
  }
}

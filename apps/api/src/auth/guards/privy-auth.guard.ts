import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrivyClient } from '@privy-io/server-auth';
import { PrismaService } from '../../data-access/adapters/prisma.service';
import { Request } from 'express';

import { isAllowedNoDbUser } from '../decorators/allow-no-db-user.decorator';
import { isPublic } from '../decorators/is-public.decorator';

export const UsePrivyAuthGuard = () => UseGuards(PrivyAuthGuard);

@Injectable()
export class PrivyAuthGuard implements CanActivate {
  constructor(
    private readonly privyClient: PrivyClient,
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (isPublic(context, this.reflector)) return true;

    const request = context.switchToHttp().getRequest<Request>();
    // console.log('test', request.cookies);
    const idToken =
      request.cookies?.['privy-token'] || request.cookies?.['privy-id-token'];

    if (!idToken) {
      throw new UnauthorizedException('`privy-token` cookie is required');
    }
    try {
      const verifiedClaims = await this.privyClient.verifyAuthToken(idToken);
      // console.log('verifiedClaims', verifiedClaims);

      const user = await this.privyClient.getUserById(verifiedClaims.userId);
      // console.log('user', user);

      let dbUser = await this.prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!dbUser) {
        dbUser = await this.prisma.user.create({
          data: {
            id: user.id,
            walletAddress: user.wallet!.address!,
            email: user.email?.address!,
          },
        });
      }

      if (!user.wallet) {
        throw new UnauthorizedException(
          'User must have either email or wallet authentication',
        );
      }

      // Attach the user to the request object for use in controllers
      (request as any)['user'] = {
        externalUser: user,
        dbUser,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Authentication error');
    }
  }
}

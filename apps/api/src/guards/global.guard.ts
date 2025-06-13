import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';

import { PrivyAuthGuard } from '../auth/guards/privy-auth.guard';

@Injectable()
export class GlobalGuard implements CanActivate {
  constructor(private readonly privyAuthGuard: PrivyAuthGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const privyResult = await this.privyAuthGuard.canActivate(context);
    if (!privyResult) {
      return false;
    }

    return true;
  }
}

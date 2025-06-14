import { Injectable, NotFoundException } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/data-access';

import { PrismaUserRepository } from '../data-access/adapters/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: PrismaUserRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async getUserStores(userId: string) {
    const stores = await this.prisma.userStore.findMany({
      where: {
        userId,
        bonusesAmount: { gt: 0 },
      },
      include: {
        store: true,
      },
    });

    return stores.map((store) => ({
      ...store.store,
      bonusesAmount: store.bonusesAmount,
    }));
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findByWalletAddress(walletAddress: string): Promise<User> {
    const user = await this.userRepository.findByWalletAddress(walletAddress);
    if (!user) {
      throw new NotFoundException(
        `User with wallet address ${walletAddress} not found`,
      );
    }
    return user;
  }

  // Permission methods
  async hasRole(userId: string, role: Role): Promise<boolean> {
    const user = await this.findById(userId);
    return user.roles.includes(role);
  }
}

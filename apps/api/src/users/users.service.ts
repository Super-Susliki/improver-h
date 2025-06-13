import { Injectable, NotFoundException } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaUserRepository } from '../data-access/adapters/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  async findById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
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

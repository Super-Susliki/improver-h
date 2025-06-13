import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { User as PrivyUser } from '@privy-io/server-auth';
import { PrismaUserRepository } from '../data-access/adapters/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  async createUserFromPrivyUser(privyUser: PrivyUser) {
    let existingUser = await this.userRepository.findById(privyUser.id);
    if (existingUser) {
      return existingUser;
    }

    const email = privyUser.email?.address ?? '';
    const walletAddress = privyUser.wallet?.address ?? '';

    // Try to find by email (if present)
    if (email) {
      existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        return existingUser;
      }
    }

    // Try to find by wallet address (if present)
    if (walletAddress) {
      existingUser =
        await this.userRepository.findByWalletAddress(walletAddress);
      if (existingUser) {
        return existingUser;
      }
    }

    return await this.userRepository.save({
      id: privyUser.id,
      email,
      walletAddress,
      roles: [Role.USER],
      isBlocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

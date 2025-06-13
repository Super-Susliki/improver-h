import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';

import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { email } });
    if (!record) return null;
    return record;
  }

  async findById(userId: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return record;
  }

  async findByWalletAddress(walletAddress: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: { walletAddress },
    });
    return record;
  }

  async save(user: User): Promise<User> {
    const { ...userData } = user;
    const upserted = await this.prisma.user.upsert({
      where: { id: user.id },
      update: {
        ...userData,
      },
      create: {
        ...userData,
      },
    });
    return upserted;
  }

  async addRole(userId: string, role: Role): Promise<User> {
    const user = await this.findById(userId);
    if (!user) throw new Error(`User with ID ${userId} not found`);

    // Check if user already has this role
    if (user.roles.includes(role)) {
      return user;
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: {
          push: role,
        },
      },
    });
  }

  async removeRole(userId: string, role: Role): Promise<User> {
    const user = await this.findById(userId);
    if (!user) throw new Error(`User with ID ${userId} not found`);

    // Filter out the role to remove
    const updatedRoles = user.roles.filter((r) => r !== role);

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: updatedRoles,
      },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Store } from '@prisma/client';
import { PrismaService } from 'src/data-access';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Store> {
    const store = await this.prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }

    return store;
  }

  async findAll(): Promise<Store[]> {
    return this.prisma.store.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

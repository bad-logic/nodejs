import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      errorFormat: 'minimal',
      // log: ['query']
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}

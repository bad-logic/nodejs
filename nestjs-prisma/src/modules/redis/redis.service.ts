import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger('RedisService');
  private redisClient: Redis;
  private db = 1;

  constructor() {
    this.redisClient = new Redis(
      parseInt(process.env['REDIS_PORT']),
      process.env['REDIS_HOST'],
      {
        db: this.db,
      },
    );
    this.redisClient.on('connect', () => {
      this.logger.log(
        `connected to redis@${process.env['REDIS_HOST']}:${process.env['REDIS_PORT']}/db${this.db} ✔️`,
      );
    });
    this.redisClient.on('error', (err) => {
      this.logger.error({ err });
    });
  }

  async set(key: string, value: Record<string, string>) {
    await this.redisClient.hset(key, value);
  }

  async get(key: string): Promise<Record<string, string> | null> {
    try {
      const data = await this.redisClient.hgetall(key);
      if (!data) return null;
      return data;
    } catch (err) {
      return null;
    }
  }
}

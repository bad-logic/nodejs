import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { DI_TOKENS } from '../../utils/tokens';

const REDIS_CONNECTION_SERVICE = {
  provide: DI_TOKENS.REDIS_SERVICE,
  useClass: RedisService,
};

@Module({
  providers: [REDIS_CONNECTION_SERVICE],
  exports: [REDIS_CONNECTION_SERVICE],
})
export class RedisModule {}

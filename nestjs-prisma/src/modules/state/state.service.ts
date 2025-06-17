import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { DI_TOKENS } from '../../utils/tokens';

@Injectable()
export class StateService {
  @Inject(DI_TOKENS.REDIS_SERVICE)
  private redisService: RedisService;
  async saveObject(obj: any): Promise<string> {
    await this.redisService.set('state', obj);
    return 'OK';
  }

  async getObject(): Promise<any> {
    return this.redisService.get('state');
  }
}

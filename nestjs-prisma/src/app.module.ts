import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { WelcomeModule } from './modules/welcome/welcome.module';
import { StateModule } from './modules/state/state.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule, WelcomeModule, StateModule],
})
export class AppModule {}

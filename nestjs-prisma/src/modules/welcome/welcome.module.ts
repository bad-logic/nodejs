import { Module } from '@nestjs/common';
import { WelcomeService } from './welcome.service';
import { WelcomeController } from './welcome.controller';

@Module({
  controllers: [WelcomeController],
  providers: [WelcomeService],
})
export class WelcomeModule {}

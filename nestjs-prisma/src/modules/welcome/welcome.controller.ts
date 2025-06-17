import { Controller, Get, Inject } from '@nestjs/common';
import { WelcomeService } from './welcome.service';

@Controller()
export class WelcomeController {
  constructor(@Inject() private readonly appService: WelcomeService) {}

  @Get()
  getStats(): Record<string, string> {
    return this.appService.getSystemStats();
  }
}

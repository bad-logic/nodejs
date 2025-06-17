import { Injectable } from '@nestjs/common';

@Injectable()
export class WelcomeService {
  getSystemStats(): Record<string, string> {
    return {
      version: '1.0.0',
      status: 'up',
    };
  }
}

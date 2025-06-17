import { Test, TestingModule } from '@nestjs/testing';
import { WelcomeController } from './welcome.controller';
import { WelcomeService } from './welcome.service';

describe('AppController', () => {
  let appController: WelcomeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WelcomeController],
      providers: [WelcomeService],
    }).compile();

    appController = app.get<WelcomeController>(WelcomeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getStats()).toEqual({
        version: '1.0.0',
        status: 'up',
      });
    });
  });
});

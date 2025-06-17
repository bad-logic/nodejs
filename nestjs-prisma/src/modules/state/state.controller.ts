import { Controller, Inject, Get, Post, Body } from '@nestjs/common';
import { StateService } from './state.service';

@Controller('/state')
export class StateController {
  @Inject()
  private stateService: StateService;

  @Get()
  getCurrentState() {
    return this.stateService.getObject();
  }

  @Post()
  saveCurrentState(@Body() obj: any) {
    this.stateService.saveObject(obj);
  }
}

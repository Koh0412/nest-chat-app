import { Controller, Get } from '@nestjs/common';
import { AppService, HomeParams } from './app.service';
import { View } from 'src/common/index';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @View("index")
  index(): HomeParams {
    return this.appService.params;
  }

  getHello(): string {
    return this.appService.getHello();
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { View } from 'src/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @View("index")
  index(): void {
    //
  }
}

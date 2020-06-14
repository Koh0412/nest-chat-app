import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { View } from 'src/server/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { StrategyName } from 'src/server/common/constants/const';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @View("index")
  index(): void {
    //
  }

  @UseGuards(AuthGuard(StrategyName.LOCAL))
  @Post("login")
  async login(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @Get("login")
  @View("auth.login")
  getLoginPage() {
    //
  }

  @UseGuards(AuthGuard(StrategyName.JWT))
  @Get("me")
  getProfile(@Request() req: any) {
    return req.user;
  }
}

import { Controller, Get, UseGuards, Post, Request, UseFilters, Req, Res } from "@nestjs/common";
import { View } from "src/server/common";
import { LoginGuard } from "src/server/common/guards/login.guard";
import { AuthenticateGuard } from "src/server/common/guards/authenticate.guard";
import { AuthExceptionFilter } from "src/server/common/filters";
import { Request as ExpressRequest, Response } from "express";

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  @Get()
  @View("index")
  index(): void {
    //
  }

  @UseGuards(LoginGuard)
  @Post("login")
  async login(@Res() res: Response) {
    return res.redirect("/me");
  }

  @Get("login")
  @View("auth.login")
  getLoginPage(@Req() req: ExpressRequest) {
    return { message: req.flash("loginError") };
  }

  @UseGuards(AuthenticateGuard)
  @Get("me")
  getProfile(@Request() req: any) {
    return req.user;
  }
}

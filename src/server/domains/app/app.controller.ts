import { Controller, Get, UseGuards, Post, Request, UseFilters, Req, Res } from "@nestjs/common";
import { View, AuthGet } from "src/server/common/decorators";
import { LoginGuard } from "src/server/handlers/guards";
import { AuthExceptionFilter } from "src/server/handlers/filters";
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

  @AuthGet("me")
  getProfile(@Request() req: any) {
    return req.user;
  }
}

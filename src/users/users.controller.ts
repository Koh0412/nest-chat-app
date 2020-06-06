import { Controller, Get, Post, HttpCode, HttpStatus, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get()
  public index(): string {
    return "this action returns all users";
  }

  @Get(":id")
  public show(@Param("id") id: string): string {
    return `this action return user id: ${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  public create(): string {
    return "this action add new user";
  }
}

import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entity/user.entity';
import { InsertResult } from 'typeorm';
import { View, RedirectRoot } from 'src/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @View("users.index")
  index() {
    return { users: this.userService.all() };
  }

  @Get(":id")
  show(@Param("id") id: string): string {
    return `this action return user id: ${id}`;
  }

  @Post()
  @RedirectRoot()
  create(@Body() user: User): Promise<InsertResult> {
    return this.userService.create(user);
  }
}

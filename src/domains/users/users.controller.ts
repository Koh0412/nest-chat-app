import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entity/user.entity';
import { InsertResult } from 'typeorm';
import { View, RedirectRoot } from 'src/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @View("users.index")
  async index() {
    const users = await this.userService.all();
    return { users };
  }

  @Get(":id")
  @View("users.show")
  async show(@Param("id") id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
    }
    return { user };
  }

  @Post()
  @RedirectRoot()
  async create(@Body() user: User): Promise<InsertResult> {
    user.password = this.userService.getPasswordHash(user.password, 10);
    return this.userService.create(user);
  }
}

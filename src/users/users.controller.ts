import { Controller, Get, Post, HttpCode, HttpStatus, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from 'src/users/interfaces/users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async index(): Promise<User[]> {
    const users = this.userService.fundAll();
    return users;
  }

  @Get(":id")
  show(@Param("id") id: string): string {
    return `this action return user id: ${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    this.userService.create(createUserDto);
  }
}

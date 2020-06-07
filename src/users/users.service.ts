import { Injectable } from '@nestjs/common';
import { User } from 'src/users/interfaces/users.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User): void {
    this.users.push(user);
  }

  fundAll(): User[] {
    return this.users;
  }
}

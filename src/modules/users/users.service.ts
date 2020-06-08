import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository, InsertResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  private users: User[] = [];

  create(userProp: User): Promise<InsertResult> {
    const user: User = new User();
    user.name = userProp.name;
    user.age = userProp.age;
    user.email = userProp.email;

    return this.userRepository.insert(user);
  }

  all(): User[] {
    this.userRepository.find().then((users) => {
      this.users = users;
    });
    return this.users;
  }
}

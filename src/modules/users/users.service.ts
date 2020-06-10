import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository, InsertResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(data: Partial<User>): Promise<InsertResult> {
    return this.userRepository.insert({ ...data });
  }

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = this.userRepository.findOne({
      where: { id: parseInt(id, 10) }
    });
    return user;
  }
}

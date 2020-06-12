import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { ModelService } from 'src/base/services/model.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService extends ModelService<User> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(userRepository);
  }

  /**
   * パスワードをハッシュ化する
   *
   * @param password
   * @param saltRounds
   */
  getPasswordHash(password: string, saltRounds: number): string {
    const salt: string = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}

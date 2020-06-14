/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import * as bcript from "bcrypt";
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  /**
   * ユーザーの認証チェック
   *
   * @param email
   * @param password
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByParams({ email });

    if (user && bcript.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}

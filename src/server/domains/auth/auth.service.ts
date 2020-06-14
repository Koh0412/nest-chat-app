/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcript from "bcrypt";
import { UsersService } from '../users/users.service';
import { User } from 'src/server/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

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

  /**
   * ログイン処理
   *
   * @param user
   */
  async login(user: User) {
    const payload = { name: user.name, id: user.id };
    return {
        access_token: this.jwtService.sign(payload),
    };
  }
}

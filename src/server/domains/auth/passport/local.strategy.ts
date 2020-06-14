import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import * as passport from "passport";
import { AuthService } from "../auth.service";
import { UnauthorizedException, Injectable } from "@nestjs/common";
import { StrategyName } from "src/server/common/constants/const";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, StrategyName.LOCAL) {
  constructor(private readonly authService: AuthService) {
    super({
        usernameField: "email",
        passwordField: "password",
    });
    this.name = StrategyName.LOCAL;
    passport.use(this);
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
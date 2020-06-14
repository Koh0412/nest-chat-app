import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { StrategyName, SECRET_KEY } from 'src/server/common/constants/const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyName.JWT) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, name: payload.name };
  }
}
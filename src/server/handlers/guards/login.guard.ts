import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyName } from '../../common/constants/const';

/**
 * ログイン機能のガードクラス
 */
@Injectable()
export class LoginGuard extends AuthGuard(StrategyName.LOCAL) {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const req = context.switchToHttp().getRequest();
    await super.logIn(req);
    return result;
  }
}

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Response, Request } from 'express';

/**
 * 認証に関するフィルタクラス
 */
@Catch(HttpException)
export class AuthExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res= ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException
    ) {
      req.flash("login Error", "please try again!");
      res.redirect("/login");
    }
  }
}

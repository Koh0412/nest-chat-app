import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

/**
 * 404が発生した際のフィルタクラス
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const res: Response = http.getResponse();
    const status = exception.getStatus();
    // 404ページに遷移
    res.status(status).render("error/404", {message: `${status} ${exception.message}`, stack: exception.stack });
  }
}

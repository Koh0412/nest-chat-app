import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, InternalServerErrorException } from '@nestjs/common';

/**
 * 500エラーが発生した時のフィルタクラス
 */
@Catch(InternalServerErrorException)
export class InternalExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const res = http.getResponse();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    // 500ページに遷移
    res.status(status).render("error/500", { status });
  }
}

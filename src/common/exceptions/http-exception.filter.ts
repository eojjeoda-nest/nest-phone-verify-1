import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

type Error = {
  statusCode: number;
  message: string | string[];
  error: string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | Error;

    const message: string | string[] =
      typeof error === 'string' ? error : error.message;

    response.status(status).json({
      statusCode: status,
      message: typeof message === 'string' ? [message] : [...message],
      timestamp: new Date().toISOString(),
    });
  }
}

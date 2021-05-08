import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseHttpException } from './base-http-exception';
import { ExceptionInterface } from './exception.interface';

@Catch(HttpException, BaseHttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorResponse = exception.getResponse() as ExceptionInterface;
    const message = Array.isArray(errorResponse.message)
      ? errorResponse.message[0]
      : errorResponse.message;
    response.json({
      success: false,
      ...errorResponse,
      message,
    });
  }
}
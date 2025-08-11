import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ResponseService } from '../services/response.service';
import { ErrorResponse } from '../dto/error-response.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly responseService: ResponseService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any[] = [];

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      status = exception.getStatus();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const res: any = exceptionResponse;
        message = res.message || message;
        if (res.errors) {
          errors = res.errors;
        } else if (Array.isArray(res.message)) {
          errors = res.message.map((msg: string) => ({ message: msg }));
        } else {
          errors = [{ message }];
        }
      }
    } else if (exception?.message) {
      message = exception.message;
      errors = [{ message }];
    }

    const errorResponse: ErrorResponse = this.responseService.createErrorResponse(message, errors, status);

    response.status(status).send(errorResponse); // 👈 Fastify uses `.send()` not `.json()`
  }
}

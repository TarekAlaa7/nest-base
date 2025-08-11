import { Injectable } from '@nestjs/common';
import { SuccessResponse } from '../dto/success-response.dto';
import { ErrorResponse } from '../dto/error-response.dto';

@Injectable()
export class ResponseService {
  createSuccessResponse<T>(data: T, message?: string, status: number = 200): SuccessResponse<T> {
    return new SuccessResponse(data, message, status); 
  }

  createErrorResponse(message: string = 'An error occurred.', errors: any[] = [], status: number = 422): ErrorResponse {
    return new ErrorResponse(message, errors, status); 
  }
}

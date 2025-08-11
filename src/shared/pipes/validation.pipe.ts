import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ErrorResponse } from '../dto/error-response.dto'; // استجابة الخطأ الموحدة

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    if (!metadata.metatype) {
      return value; 
    }

    const obj = plainToClass(metadata.metatype, value as object); 

    const errors = await validate(obj);

    if (errors.length > 0) {
      const errorMessages = errors.map((error: ValidationError) => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        return {
          field: error.property,
          message: constraints.length > 0 ? constraints[0] : 'Unknown validation error', 
        };
      });

      throw new BadRequestException(
        new ErrorResponse('Validation failed', errorMessages, 422), 
      );
    }

    return value; 
  }
}

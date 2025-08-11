import { plainToInstance } from 'class-transformer';

export class Transformer {
  static toResponse<T, V>(dto: new () => T, data: V): T {
    return plainToInstance(dto, data, {
      excludeExtraneousValues: true,
    });
  }

  static toResponseArray<T, V>(dto: new () => T, data: V[]): T[] {
    return plainToInstance(dto, data, {
      excludeExtraneousValues: true,
    });
  }
}

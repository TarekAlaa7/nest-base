import { plainToInstance } from 'class-transformer';
import { PaginationMetaDto, PaginationResponseDto } from './pagination-response.dto';

export class PaginationTransformer {
  static transform<T>(
    dto: new () => T,
    data: any[],
    paginationMeta: { total: number; perPage: number; currentPage: number; lastPage: number }
  ): PaginationResponseDto<T> {
    const items = plainToInstance(dto, data, { excludeExtraneousValues: true });
    const meta = plainToInstance(PaginationMetaDto, paginationMeta, { excludeExtraneousValues: true });

    return new PaginationResponseDto(items, meta, dto);
  }
}

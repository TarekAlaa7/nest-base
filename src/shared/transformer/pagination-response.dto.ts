import { Expose, Type } from 'class-transformer';

export class PaginationMetaDto {
  @Expose()
  total: number;

  @Expose()
  perPage: number;

  @Expose()
  currentPage: number;

  @Expose()
  lastPage: number;
}

export class PaginationResponseDto<T> {
  @Expose()
  @Type((options) => options?.newObject?.itemType)
  data: T[];

  @Expose()
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  itemType?: new () => T;

  constructor(data: T[], meta: PaginationMetaDto, itemType: new () => T) {
    this.data = data;
    this.meta = meta;
    this.itemType = itemType;
  }
}

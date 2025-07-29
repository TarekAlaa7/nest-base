import { Expose } from 'class-transformer';

export class UserDefaultDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
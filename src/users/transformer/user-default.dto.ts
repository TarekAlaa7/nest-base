import { Expose, Type } from 'class-transformer';
import { BaseDto } from '../../shared/transformer/base.dto';
import { RoleDto } from './role.dto';

export class UserDefaultDto extends BaseDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  @Type(() => RoleDto)
  role: RoleDto;
}

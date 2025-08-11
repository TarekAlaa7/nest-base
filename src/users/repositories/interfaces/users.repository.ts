import { User } from '../../entity/users.entity';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: number , data: Partial<User>): Promise<User | null>;
  delete(id: number): Promise<void>;
}
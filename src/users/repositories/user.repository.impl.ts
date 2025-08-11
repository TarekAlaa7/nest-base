import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import { IUserRepository } from './interfaces/users.repository';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.repo.findOneBy({ id });
    console.log(user)
    if (!user) {
        throw new Error('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.repo.findOneBy({ email });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
  }

  create(user: User): Promise<User> {
    return this.repo.save(user);
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
        await this.repo.update(id, userData);
        const updated = await this.repo.findOneBy({ id });
        if (!updated) throw new Error('User not found');
        return updated
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

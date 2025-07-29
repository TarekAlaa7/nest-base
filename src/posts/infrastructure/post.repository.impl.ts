import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../domain/post.entity';
import { PostRepository } from '../domain/post.repository';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly repo: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.repo.findOneBy({ id });
    if (!post) throw new NotFoundException(`Post ${id} not found`);
    return post;
  }

  create(post: Post): Promise<Post> {
    return this.repo.save(post);
  }

  async update(id: number, data: Partial<Post>): Promise<Post> {
    await this.repo.update(id, data);
    const updated = await this.repo.findOneBy({ id });
    if (!updated) throw new NotFoundException();
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

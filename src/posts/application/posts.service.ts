import { Injectable, Inject } from '@nestjs/common';
import { PostRepository } from '../domain/post.repository';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../domain/post.entity';
import { User } from '../../users/entity/users.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
  ) {}

  findAll() {
    return this.postRepository.findAll();
  }

  findOne(id: number) {
    return this.postRepository.findOne(id);
  }

  create(dto: CreatePostDto) {
    const post = new Post();
    post.title = dto.title;
    post.content = dto.content;
    post.user = { id: dto.userId } as User; // attach user by id only
    return this.postRepository.create(post);
  }

  update(id: number, dto: UpdatePostDto) {
    return this.postRepository.update(id, dto);
  }

  delete(id: number) {
    return this.postRepository.delete(id);
  }
}

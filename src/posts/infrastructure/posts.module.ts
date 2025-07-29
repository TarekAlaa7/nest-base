import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../domain/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from '../application/posts.service';
import { PostRepositoryImpl } from './post.repository.impl';
import { PostRepository } from '../domain/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostRepositoryImpl,
    {
      provide: PostRepository,
      useExisting: PostRepositoryImpl,
    },
  ],
})
export class PostsModule {}

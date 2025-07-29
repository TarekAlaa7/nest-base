import { Post } from './post.entity';

export abstract class PostRepository {
  abstract findAll(): Promise<Post[]>;
  abstract findOne(id: number): Promise<Post>;
  abstract create(post: Post): Promise<Post>;
  abstract update(id: number, data: Partial<Post>): Promise<Post>;
  abstract delete(id: number): Promise<void>;
}
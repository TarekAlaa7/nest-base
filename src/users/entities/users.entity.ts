import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Post} from '../../posts/domain/post.entity'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique : true})
  email: string;

  @Column()
  role: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}

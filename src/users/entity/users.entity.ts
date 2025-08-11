import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import {Post} from '../../posts/domain/post.entity'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ unique : true})
  email: string;

  @Column()
  @IsOptional()
  role: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}

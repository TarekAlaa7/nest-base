import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/infrastructure/posts.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,             
      username: 'root',       
      password: '',
      database: 'nest_crud',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // set to false in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

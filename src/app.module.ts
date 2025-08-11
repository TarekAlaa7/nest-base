import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/infrastructure/posts.module';
import { THROTTLE_LIMIT, THROTTLE_TTL } from './shared/constants/throttle.constants';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    ThrottlerModule.forRootAsync({
      useFactory: async (): Promise<ThrottlerModuleOptions> => ({
        ttl: THROTTLE_TTL,
        limit: THROTTLE_LIMIT,
      }),
      inject: [],
    }),

    UserModule,
    PostsModule,
    SharedModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,         
      port: parseInt(process.env.DB_PORT!),      
      username: process.env.DB_USERNAME,     
      password: process.env.DB_PASSWORD,          
      database: process.env.DB_NAME, 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,  
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

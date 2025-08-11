import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { UserRepositoryImpl } from './repositories/user.repository.impl';
import { USER_REPOSITORY } from './constants/user-repository.token';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useExisting: UserRepositoryImpl,
    },
    UserRepositoryImpl,
    UsersService,
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [USER_REPOSITORY, UsersService],
})
export class UserModule {}

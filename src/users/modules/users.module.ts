import { forwardRef,Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { USER_REPOSITORY  } from '../constants/user-repository.token';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useExisting: UserRepositoryImpl,
    },
    UserRepositoryImpl,
    UsersService
  ],
  exports: [USER_REPOSITORY,UsersService], // <-- optional
})

export class UsersModule {}

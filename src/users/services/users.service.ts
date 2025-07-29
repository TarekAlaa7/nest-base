import { Injectable, NotFoundException,Inject } from '@nestjs/common';
import { User } from '../entities/users.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRepository } from '../repositories/interfaces/users.repository';
import { USER_REPOSITORY } from '../constants/user-repository.token';
import { UserDefaultDto } from '../dto/user-default.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository : IUserRepository
    ){}

    async findAll() : Promise<UserDefaultDto>
    {
        const users = this.userRepository.findAll()
        return plainToInstance(UserDefaultDto, users, {excludeExtraneousValues: true})
    }

    findOne(id: number)
    {
        return this.userRepository.findOne(id)
    }

    create(createUserDto : CreateUserDto)
    {
        const user = new User()
        user.name = createUserDto.name
        user.email = createUserDto.email
        user.role = createUserDto.role
        return this.userRepository.create(user);
    }

    update(id: number, dto: UpdateUserDto) {
        return this.userRepository.update(id, dto)
    }

    async delete(id: number) {
        await this.userRepository.delete(id)
    }
}

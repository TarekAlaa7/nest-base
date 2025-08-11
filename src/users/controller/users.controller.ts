import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller({path : 'users', version: '1'})
export class UsersController {

    constructor(private readonly userServices : UsersService){}

    @Get() // GET /users
    findAll() {
        return this.userServices.findAll()
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id : number){
        return this.userServices.findOne(id)
    }

    @Post() // POST /users
    create(@Body(ValidationPipe) user : CreateUserDto)
    {
        return this.userServices.create(user)
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id : number, @Body(ValidationPipe) userUpdate: UpdateUserDto){
        return this.userServices.update(id,userUpdate)
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id : number){
        return this.userServices.delete(id)
    }

}

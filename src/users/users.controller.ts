import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersserivce: UsersService) {}

    @Post()
    async create(@Body() data: UsersDto) {
        return this.usersserivce.create(data);
    }

    @Delete(":id")  // nao sei se vou manter o delete assim pois vai ser o próprio usuário q vai deletar a conta ent nsei se vai ser necessário fazer procurando o id
    async delete(@Param("id") id: number){
    return this.usersserivce.delete(Number(id));
}
}

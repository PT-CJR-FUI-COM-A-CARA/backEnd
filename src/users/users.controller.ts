import { Body, Controller, Post } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersserivce: UsersService) {}

    @Post()
    async create(@Body() data: UsersDto) {
        return this.usersserivce.create(data);
    }
}

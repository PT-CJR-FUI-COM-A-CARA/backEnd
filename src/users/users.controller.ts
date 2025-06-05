import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() data: UsersDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.userService.FindAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, data: UsersDto) {
    return this.userService.update(id, data);
  }

  @Delete(':id') // nao sei se vou manter o delete assim pois vai ser o próprio usuário q vai deletar a conta ent nsei se vai ser necessário fazer procurando o id
  async delete(@Param('id') id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.userService.delete(Number(id));
  }
}

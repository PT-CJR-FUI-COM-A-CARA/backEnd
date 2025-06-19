import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @IsPublic()
  @Post()
  async create(@Body() data: UsersDto) {
    return this.userService.create(data);
  }
  @Get()
  async findAll() {
    return this.userService.FindAll();
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.FindOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateUserDto,) {
    return this.userService.update(id, updateData);
  }
  @Delete(':id') // nao sei se vou manter o delete assim pois vai ser o próprio usuário q vai deletar a conta ent nsei se vai ser necessário fazer procurando o id
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(Number(id));
  }
}

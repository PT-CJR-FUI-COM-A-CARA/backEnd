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
import { ChangePasswordDto } from './dto/change-password.dto';

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

  @Patch('change-password/:id')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(id, changePasswordDto);
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.FindOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateUserDto,
  ) {
        console.log(`--- TENTANDO ATIVAR CHANGE user com ID: ${id} ---`);

    return this.userService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(Number(id));
  }
}
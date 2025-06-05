/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
//import { PrismaClient } from 'generated/prisma';
import { PrismaService } from '../database/prisma.service';
import { UsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(data: UsersDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const user = await this.prisma.users.create({
      data,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }

  async FindAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return await this.prisma.users.findMany();
  }

  async update(id: number, data: UsersDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userExists = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('Usuario não encontrado');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await this.prisma.users.update({
      data,
      where: {
        id,
      },
    });
  }
  async delete(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userExists = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!userExists) {
      throw new Error('Usuário nao existe');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return await this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}

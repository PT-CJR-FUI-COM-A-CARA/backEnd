/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UsersDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    async create(data: UsersDto) {
        const senhaHash = await bcrypt.hash(data.senha, 10)
        const user = await this.prisma.users.create({
        data:{ 
    ...data,
    senha: senhaHash},
    });
    const {senha, ...result} = user;
    return result
}

    async FindAll() {

        return await this.prisma.users.findMany();
}

    async update(id: number, updateData: UpdateUserDto) {
    const userExists = await this.prisma.users.findUnique({
        where: {
        id,
    },
    });

    if (!userExists) {
        throw new Error('Usuario não encontrado');
    }

const dataToUpdateInPrisma: any = {};
if (updateData.nome) {
    dataToUpdateInPrisma.nome = updateData.nome;
}
if (updateData.email) {
    dataToUpdateInPrisma.email = updateData.email;
}
const updateUser = await this.prisma.users.update({
    where: { id },
    data: dataToUpdateInPrisma,
});
const {senha, ...result} = updateUser;
return result;
}
    async delete(id: number) {
    const userExists = await this.prisma.users.findUnique({
        where: {
        id,
      },
    });
    if (!userExists) {
        throw new Error('Usuário nao existe');
    }
    return await this.prisma.users.delete({
        where: {
        id,
      },
    });
  }
}

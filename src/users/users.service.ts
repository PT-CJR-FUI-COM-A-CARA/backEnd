import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UsersDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    async create(data: UsersDto) {
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(data.senha, saltRounds);
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
if (updateData.departamento) {
    dataToUpdateInPrisma.departamento = updateData.departamento;
}
if (updateData.curso) {
    dataToUpdateInPrisma.curso = updateData.curso;
}
if (updateData.senha){
    const senhanova = await bcrypt.hash(updateData.senha, 10)
    dataToUpdateInPrisma.senha = senhanova;
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

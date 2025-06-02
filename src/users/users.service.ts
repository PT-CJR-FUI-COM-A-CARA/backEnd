import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { PrismaService } from '../database/prisma.service';
import { UsersDto } from './dto/users.dto'; 

@Injectable()
export class UsersService {
    constructor (private prisma: PrismaService){}
    async create (data: UsersDto){
        const user = await this.prisma.users.create({
            data
        });
        return user;
    }
    async delete(id: number) {
        const userExists = await this.prisma.users.findUnique({
            where: {
                id,
            }
        });
        if (!userExists) { 
            throw new Error('Usuário nao existe');
        }
        return await this.prisma.users.delete({
            where: {
                id,
            }
        })
    }

    
}


import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { PrismaService } from './database/prisma.service';
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
}


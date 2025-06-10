import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProfessoresDto } from './dto/professores.dto';

@Injectable()
export class ProfessoresService {
    constructor(private prisma: PrismaService) {}
    async create(data: ProfessoresDto) {
        const professor = await this.prisma.professores.create({
            data: data,
        });

        return professor;
    }
}

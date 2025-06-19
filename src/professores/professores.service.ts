import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProfessoresDto } from './dto/professores.dto';
import { ProfessoresDtoUpdate } from './dto/update-professores.dto';

@Injectable()
export class ProfessoresService {
    constructor(private prisma: PrismaService) {}
    async create(data: ProfessoresDto) {
        const professor = await this.prisma.professores.create({
            data: data,
        });

        return professor;
    }
    
    async findAll(){
        return await this.prisma.professores.findMany();
    }

    async delete(id: number){
        const professorExists = await this.prisma.professores.findUnique({
            where: {
                id,
            },
        });

        if(!professorExists){
            throw new Error('professor não existe');
        } 

        return await this.prisma.professores.delete({
            where: {
                id,
            },
        });
    }

    async update(id: number, updateData: ProfessoresDtoUpdate){
        const professorExists = await this.prisma.professores.findUnique({
            where: {
                id,
            },
        });

        if(!professorExists){
            throw new Error('professor não existe');
        } 
        
        const dataToUpdateInPrisma: any = {};
        if (updateData.nome) {
        dataToUpdateInPrisma.nome = updateData.nome;
    }
    if (updateData.materia) {
    dataToUpdateInPrisma.materia = updateData.materia;
    }
        if (updateData.departamento) {
        dataToUpdateInPrisma.departamento = updateData.departamento;
    }
        const updateProfessores = await this.prisma.professores.update({
        where: { id },
        data: dataToUpdateInPrisma
    });
    
    return updateProfessores;
}

}

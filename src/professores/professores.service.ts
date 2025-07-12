import { PrismaService } from 'src/database/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { ProfessoresDto } from './dto/professores.dto';
import { ProfessoresDtoUpdate } from './dto/update-professores.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfessoresService {
    constructor(private prisma: PrismaService) {}


    async create(data: ProfessoresDto, file?: Express.Multer.File) {
    const { nome, departamento, materias } = data;
    const fotoPath = file ? `/uploads/${file.filename}` : null;

    try {
      const materiasParsed = typeof materias === 'string'
        ? JSON.parse(materias as any)
        : materias;

      return await this.prisma.professores.create({
        data: {
          nome,
          departamento,
          fotosrc: fotoPath, 
          materias: {
            connectOrCreate: materiasParsed.map((nomeDaMateria: string) => ({
              where: { nome: nomeDaMateria },
              create: { nome: nomeDaMateria },
            })),
          },
        },
        include: {
          materias: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(`Um professor com o nome "${nome}" já existe.`);
      }
      throw error;
    }
  }
    
    async findAll(){
        return await this.prisma.professores.findMany({
            include:{avaliacoes: true, materias: true}
        });
    }

    async FindOne(id: number) {
        if(!id){
            throw new Error('Professor não encontrado')
        }
        return await this.prisma.professores.findUnique({
        where: {
        id,
    },
    include:{avaliacoes: true, materias: true},
    });
}

    async delete(id: number){
        const professorExists = await this.prisma.professores.findUnique({
            where: {
                id,
            },
        });

        if(!professorExists){
            throw new Error('Professor não existe');
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
            throw new Error('Professor não existe');
        } 
        
        const dataToUpdateInPrisma: any = {};
        if (updateData.nome) {
        dataToUpdateInPrisma.nome = updateData.nome;
    }

        if (updateData.departamento) {
        dataToUpdateInPrisma.departamento = updateData.departamento;
    }
        if (updateData.fotosrc) {
        dataToUpdateInPrisma.fotosrc = updateData.fotosrc;
    }
        const updateProfessores = await this.prisma.professores.update({
        where: { id },
        data: dataToUpdateInPrisma
    });
    
    return updateProfessores;
}

}

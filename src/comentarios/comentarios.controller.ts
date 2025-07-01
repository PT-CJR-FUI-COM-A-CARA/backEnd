import { Body, Controller, Get, Put, Delete, Param, Post } from '@nestjs/common';
import { ComentarioDto } from './dto/comentarios.dto';
import { ComentariosService } from './comentarios.service';

@Controller ('comentarios')

export class ComentariosController {

    constructor (private readonly comentariosService : ComentariosService){}
    @Post()
    async create(@Body() data: ComentarioDto){
        return this.comentariosService.create(data);
    }

    @Get()
    async findAll(){
        return this.comentariosService.findAll()
    }

    @Get('count/:avaliacaoId')
    async countPorAvaliacao(@Param('avaliacaoId') avaliacaoId: string) {
    const count = await this.comentariosService.countComentariosPorAvaliacao(Number(avaliacaoId));
    return { count };
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() data: ComentarioDto) {
        return this.comentariosService.update(Number(id), data);

    }

    @Delete(":id")
    async delete(@Param("id") id:number){
        return this.comentariosService.delete(Number(id));
    }

    @Get(":id")
    async getById(@Param("id") id: number){
        return this.comentariosService.getById(Number(id));
    }
}
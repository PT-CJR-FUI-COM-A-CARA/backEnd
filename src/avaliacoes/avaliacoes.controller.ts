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
import { AvaliacoesService } from './avaliacoes.service';
import { AvaliacoesDto } from './dto/avaliacoes.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { AvaliacoesDtoUpdate } from './dto/update-avaliacoes.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('avaliacoes')
export class AvaliacoesController {
    constructor(private readonly avaliacoesService: AvaliacoesService) {}
    @Post()
    async create(@Body() data: AvaliacoesDto) {
        return this.avaliacoesService.create(data)
    }
    @IsPublic()
    @Get()
    async findAll(){
        return this.avaliacoesService.findAll();
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.avaliacoesService.delete(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update (@Param('id', ParseIntPipe) id: number, @Body() updateData: AvaliacoesDtoUpdate) {
        return this.avaliacoesService.update(id, updateData)
    }
}
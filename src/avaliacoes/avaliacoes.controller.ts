import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  Request,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AvaliacoesService } from './avaliacoes.service';
import { AvaliacoesDto } from './dto/avaliacoes.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { AvaliacoesDtoUpdate } from './dto/update-avaliacoes.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@Controller('avaliacoes')
export class AvaliacoesController {
    constructor(private readonly avaliacoesService: AvaliacoesService) {}
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req, @Body() data: AvaliacoesDto) {
        const userId = req.user.id; 
        return this.avaliacoesService.create(userId, data)
    }
    @IsPublic()
    @Get()
    async findAll(){
        return this.avaliacoesService.findAll();
    }
    
    @IsPublic()
      @Get(':id')
      async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.avaliacoesService.FindOne(Number(id));
      }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.avaliacoesService.delete(id);
    }
    
    @Patch(':id')
    async update (@Param('id', ParseIntPipe) id: number, @Body() updateData: AvaliacoesDtoUpdate) {
        return this.avaliacoesService.update(id, updateData)
    }
}
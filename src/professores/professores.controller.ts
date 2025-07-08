import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ProfessoresDto } from './dto/professores.dto';
import { ProfessoresService } from './professores.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ProfessoresDtoUpdate } from './dto/update-professores.dto';
import { IsAdmin } from '@/auth/decorators/is-admin.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';



@Controller('professores')
@UseGuards(JwtAuthGuard)
export class ProfessoresController {
    constructor(private readonly professoresService: ProfessoresService) {}
      @IsAdmin()
      @Post()
      async create(@Body() data: ProfessoresDto) {
        return this.professoresService.create(data);
      }

      @IsPublic()
      @Get()
      async findAll(){
        return this.professoresService.findAll();
      }

      @IsPublic()
      @Get(':id')
      async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.professoresService.FindOne(Number(id));
      }
      @IsAdmin()
      @Delete(':id')
      async delete(@Param('id', ParseIntPipe) id: number){
        return this.professoresService.delete(id);
      }
      @IsAdmin()
      @Patch(':id')
      async update(@Param('id', ParseIntPipe) id: number, @Body() updateData: ProfessoresDtoUpdate){
        return this.professoresService.update(id, updateData);
      }
      

}

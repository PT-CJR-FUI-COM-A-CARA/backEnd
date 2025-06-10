import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfessoresDto } from './dto/professores.dto';
import { ProfessoresService } from './professores.service';



@Controller('professores')
export class ProfessoresController {
    constructor(private readonly professoresService: ProfessoresService) {}
    
      @Post()
      async create(@Body()nome: string, @Body()materia: string) {
        return this.professoresService.create(nome, materia);
      }
}

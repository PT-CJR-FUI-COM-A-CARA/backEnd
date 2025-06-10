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
      async create(@Body() data: ProfessoresDto) {
        return this.professoresService.create(data);
      }
}

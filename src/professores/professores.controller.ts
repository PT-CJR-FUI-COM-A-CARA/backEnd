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
      // n esqucer de botar o decorador ispublic para as funcções q n precisa de autorização para testar
      // john qnd tu for testar no thunder client se ta funcionando usa o decorador ispublic pra vc ter q precisar gerar um token, dps só apaga ele no final
      @Post()
      async create(@Body() data: ProfessoresDto) {
        return this.professoresService.create(data);
      }
}

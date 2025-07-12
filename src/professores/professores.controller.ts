import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  UseInterceptors, 
  UploadedFile,
} from '@nestjs/common';
import { ProfessoresDto } from './dto/professores.dto';
import { ProfessoresService } from './professores.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ProfessoresDtoUpdate } from './dto/update-professores.dto';
import { IsAdmin } from '@/auth/decorators/is-admin.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0].replace(/\s/g, '_');
  const fileExtName = file.originalname.substring(file.originalname.lastIndexOf('.'));
  const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@Controller('professores')
@UseGuards(JwtAuthGuard)
export class ProfessoresController {
    constructor(private readonly professoresService: ProfessoresService) {}
      
    @Post()
  @UseInterceptors(
    FileInterceptor('foto', { 
      storage: diskStorage({
        destination: './uploads', 
        filename: editFileName,
      }),
    }),
  )
  async create(
    @Body() data: ProfessoresDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.professoresService.create(data, file);
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

import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class ProfessoresDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  departamento: string;
  
  @IsArray()
  @IsString({ each: true }) 
  @IsNotEmpty({ each: true })
  materias: string[];
}
import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller'; 
import { ProfessoresService } from './professores/professores.service';
import { ProfessoresController } from './professores/professores.controller';
import { ProfessoresModule } from './professores/professores.module';

@Module({
  imports: [UsersModule, ProfessoresModule],
  controllers: [ UsersController, ProfessoresController],
  providers: [UsersService, ProfessoresService],
})
export class AppModule {}

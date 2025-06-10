import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { ProfessoresController } from './professores/professores.controller';
import { ProfessoresModule } from './professores/professores.module';
import { PrismaModule } from './database/prisma.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProfessoresService } from './professores/professores.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, ProfessoresModule, PrismaModule, AuthModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {  expiresIn: '1h'}
  })],
  controllers: [UsersController, ProfessoresController, AuthController],
  providers: [UsersService, AuthService, ProfessoresService],
})
export class AppModule {}

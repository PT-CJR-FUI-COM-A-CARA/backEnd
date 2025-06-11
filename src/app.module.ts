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
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [UsersModule, ProfessoresModule, PrismaModule, AuthModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {  expiresIn: '1h'}
  })],
  controllers: [UsersController, ProfessoresController, AuthController],
  providers: [UsersService, AuthService, ProfessoresService, {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },],
})
export class AppModule {}

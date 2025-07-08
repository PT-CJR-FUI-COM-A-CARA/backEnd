
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';
import { IS_ADMIN_KEY } from '../decorators/is-admin.decorator';
import { Observable, lastValueFrom } from 'rxjs';
import { UserPayload } from '../models/userPayload';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

    async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    try {
      await super.canActivate(context);
    } catch (error) {
      throw new UnauthorizedException('Acesso não autorizado. Faça o login para continuar.');
    }

    const isAdminRoute = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isAdminRoute) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{ user: UserPayload }>();

    if (user && user.isAdmin) {
      return true;
    }

    throw new ForbiddenException('Este recurso é restrito a administradores.');
  }
}
import { HelperService } from '../helper/helper.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { UserRoleEnum } from '../app.enum';
import { FastifyRequest } from 'fastify';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private helperService: HelperService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<UserRoleEnum[]>(
      'roles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const currentUser = await this.helperService.getCurrentUser(request);
    if (!currentUser)
      throw new BaseHttpException(
        request?.raw?.headers?.['accept-language'] ?? 'EN',
        600,
      );
    request['currentUser'] = currentUser;
    if (!roles?.length || roles[0] !== currentUser.role)
      throw new BaseHttpException(
        request?.raw?.headers?.['accept-language'] ?? 'EN',
        605,
      );
    return true;
  }
}

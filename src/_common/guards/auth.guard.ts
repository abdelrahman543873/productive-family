import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { HelperService } from '../helper/helper.service';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private helperService: HelperService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const currentUser = await this.helperService.getCurrentUser(request);
    if (!currentUser)
      throw new BaseHttpException(
        request?.raw?.headers?.['accept-language'] ?? 'EN',
        600,
      );
    request['currentUser'] = currentUser;
    return true;
  }
}

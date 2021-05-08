import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private helperService: HelperService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const currentUser = await this.helperService.getCurrentUser(request);
    if (!currentUser) throw new BaseHttpException(request.headers.lang, 600);
    request.currentUser = currentUser;
    return true;
  }
}

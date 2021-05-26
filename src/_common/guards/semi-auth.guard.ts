import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HelperService } from '../helper/helper.service';
import { RequestContext } from '../request.interface';
import { LangEnum } from '../app.enum';

@Injectable()
export class semiAuthGuard implements CanActivate {
  constructor(private helperService: HelperService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestContext>();
    request.appContext = request['raw'];
    request.lang =
      request?.appContext.raw?.headers?.['accept-language'] ?? LangEnum.EN;
    const currentUser = await this.helperService.getCurrentUser(
      request.appContext,
    );
    request.currentUser = currentUser;
    return true;
  }
}

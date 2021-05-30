import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HelperService } from '../helper/helper.service';
import { RequestContext } from '../request.interface';
import { LangEnum } from '../app.enum';
import { BaseHttpException } from '../exceptions/base-http-exception';

@Injectable()
export class semiAuthGuard implements CanActivate {
  constructor(private helperService: HelperService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestContext>();
    request.appContext = request['raw'];
    request.lang =
      request?.appContext.raw?.headers?.['accept-language'] ?? LangEnum.EN;
    request.long = +request?.appContext.raw?.headers?.long;
    request.lat = +request?.appContext.raw?.headers?.lat;
    if (request.long && (request.long < -180 || request.long > 180))
      throw new BaseHttpException(request.lang, 613);
    if (request.lat && (request.lat < -90 || request.lat > 90))
      throw new BaseHttpException(request.lang, 614);
    const currentUser = await this.helperService.getCurrentUser(
      request.appContext,
    );
    request.currentUser = currentUser;
    return true;
  }
}

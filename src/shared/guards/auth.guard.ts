import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { UserDocument, User } from '../../user/models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private userSchema: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization)
      throw new BaseHttpException(request.headers.lang, 600);
    const currentUser = await this.userSchema.findById(request);
    if (!currentUser) throw new BaseHttpException(request.headers.lang, 600);
    request.currentUser = currentUser;
    return true;
  }
}

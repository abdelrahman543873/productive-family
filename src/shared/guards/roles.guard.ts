import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/models/user.schema';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { UserRoleEnum } from '../user.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectModel(User.name) private userSchema: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<UserRoleEnum[]>(
      'roles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const currentUser = await this.userSchema.findById(request);
    if (!currentUser) throw new BaseHttpException(request.headers.lang, 600);
    request.currentUser = currentUser;
    if (roles?.length && roles[0] !== currentUser.role) {
      throw new BaseHttpException(request.headers.lang, 605);
    }
    return true;
  }
}

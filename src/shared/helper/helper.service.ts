import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User, UserDocument } from 'src/user/models/user.schema';
import * as jwt from 'jsonwebtoken';
import { getAuthToken } from '../utils/token-utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

export interface TokenPayload {
  _id: string;
}
@Injectable()
export class HelperService {
  constructor(
    @InjectModel(User.name) private userSchema: Model<UserDocument>,
    private configService: ConfigService,
  ) {}
  async getCurrentUser(req: Request): Promise<User> {
    const token = getAuthToken(req);
    if (!token) return null;
    const { _id } = <TokenPayload>(
      jwt.verify(token, this.configService.get<string>('JWT_SECRET'))
    );
    const user = await this.userSchema.findById(_id);
    return user;
  }
}

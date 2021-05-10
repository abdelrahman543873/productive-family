import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/user/models/user.schema';
import * as jwt from 'jsonwebtoken';
import { getAuthToken } from '../utils/token-utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Driver, DriverDocument } from '../../driver/models/driver.schema';
import { FastifyRequest } from 'fastify';

export interface TokenPayload {
  _id: string;
}
@Injectable()
export class HelperService {
  constructor(
    @InjectModel(User.name) private userSchema: Model<UserDocument>,
    @InjectModel(Driver.name) private driverSchema: Model<DriverDocument>,
    private configService: ConfigService,
  ) {}
  async getCurrentUser(req: FastifyRequest): Promise<User | Driver> {
    const token = getAuthToken(req);
    if (!token) return null;
    const { _id } = <TokenPayload>(
      jwt.verify(token, this.configService.get<string>('JWT_SECRET'))
    );
    const user =
      (await this.userSchema.findById(_id)) ??
      (await this.driverSchema.findById(_id));
    return user;
  }
}

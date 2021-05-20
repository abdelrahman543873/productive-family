import { Injectable } from '@nestjs/common';
import { Admin, AdminDocument } from 'src/admin/models/admin.schema';
import * as jwt from 'jsonwebtoken';
import { getAuthToken } from '../utils/token-utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Driver, DriverDocument } from '../../driver/models/driver.schema';
import { FastifyRequest } from 'fastify';
import { GetExistingUserInput } from './inputs/get-existing-user.input';
import { Client, ClientDocument } from '../../client/models/client.schema';
import {
  Provider,
  ProviderDocument,
} from '../../provider/models/provider.schema';

export interface TokenPayload {
  _id: string;
}
@Injectable()
export class HelperService {
  constructor(
    @InjectModel(Admin.name) private adminSchema: Model<AdminDocument>,
    @InjectModel(Driver.name) private driverSchema: Model<DriverDocument>,
    @InjectModel(Client.name) private clientSchema: Model<ClientDocument>,
    @InjectModel(Provider.name) private providerSchema: Model<ProviderDocument>,
    private configService: ConfigService,
  ) {}
  async getCurrentUser(req: FastifyRequest): Promise<Admin | Driver> {
    const token = getAuthToken(req);
    if (!token) return null;
    const { _id } = <TokenPayload>(
      jwt.verify(token, this.configService.get<string>('JWT_SECRET'))
    );
    const user =
      (await this.adminSchema.findById(_id)) ??
      (await this.driverSchema.findById(_id));
    return user;
  }

  async getExistingUser(
    input: GetExistingUserInput,
  ): Promise<Admin | Driver | Client | Provider> {
    const user =
      (await this.adminSchema.findOne(
        {
          ...(input._id && { _id: input._id }),
          ...(input.email && { email: input.email }),
          ...(input.mobile && { mobile: input.mobile }),
        },
        { password: 0 },
        { lean: true },
      )) ??
      (await this.driverSchema.findOne(
        {
          ...(input._id && { _id: input._id }),
          ...(input.email && { email: input.email }),
          ...(input.mobile && { mobile: input.mobile }),
        },
        { password: 0 },
        { lean: true },
      )) ??
      (await this.clientSchema.findOne(
        {
          ...(input._id && { _id: input._id }),
          ...(input.email && { email: input.email }),
          ...(input.mobile && { mobile: input.mobile }),
        },
        { password: 0 },
        { lean: true },
      )) ??
      (await this.providerSchema.findOne(
        {
          ...(input._id && { _id: input._id }),
          ...(input.email && { email: input.email }),
          ...(input.mobile && { mobile: input.mobile }),
        },
        { password: 0 },
        { lean: true },
      ));
    return user;
  }
}

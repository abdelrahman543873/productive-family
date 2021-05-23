import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { hashPass } from 'src/_common/utils/bcryptHelper';
import { ClientRegisterInput } from './inputs/client-register.input';
import { Client, ClientDocument } from './models/client.schema';

@Injectable()
export class ClientRepository extends BaseRepository<Client> {
  constructor(
    @InjectModel(Client.name) private clientSchema: Model<ClientDocument>,
  ) {
    super(clientSchema);
  }

  async register(input: ClientRegisterInput): Promise<Client> {
    return (
      await this.clientSchema.create({
        ...input,
        ...(input.password && { password: await hashPass(input.password) }),
      })
    ).toJSON();
  }
}

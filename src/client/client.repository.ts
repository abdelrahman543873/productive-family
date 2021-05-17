import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Client, ClientDocument } from './models/client.schema';

@Injectable()
export class ClientRepository extends BaseRepository<Client> {
  constructor(
    @InjectModel(Client.name) private clientSchema: Model<ClientDocument>,
  ) {
    super(clientSchema);
  }
}

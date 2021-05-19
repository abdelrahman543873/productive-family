import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Provider, ProviderDocument } from './models/provider.schema';
@Injectable()
export class ProviderRepository extends BaseRepository<Provider> {
  constructor(
    @InjectModel(Provider.name) private providerSchema: Model<ProviderDocument>,
  ) {
    super(providerSchema);
  }
}

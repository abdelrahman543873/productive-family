import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AggregatePaginateModel,
  AggregatePaginateResult,
  Model,
} from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Provider, ProviderDocument } from './models/provider.schema';
import { SpatialType } from '../_common/spatial-schemas/spatial.enum';
import { Pagination } from 'src/_common/utils/pagination.input';
@Injectable()
export class ProviderRepository extends BaseRepository<Provider> {
  constructor(
    @InjectModel(Provider.name)
    private providerSchema: AggregatePaginateModel<ProviderDocument>,
  ) {
    super(providerSchema);
  }

  async getNewProviders(
    coordinates: number[],
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<Provider>> {
    const aggregation = this.providerSchema.aggregate([
      {
        $geoNear: {
          near: {
            type: SpatialType.Point,
            coordinates,
          },
          distanceField: 'distance',
          key: 'location',
        },
      },
    ]);
    return await this.providerSchema.aggregatePaginate(aggregation, {
      sort: { createdAt: 1 },
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }
}

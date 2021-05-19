import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, AggregatePaginateResult } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Pagination } from '../_common/utils/pagination.input';
import { ProviderDriver } from './models/provider-driver.schema';
import { ObjectID } from 'mongodb';
import { ProviderDriverDocument } from './models/provider-driver.schema';
@Injectable()
export class ProviderDriverRepository extends BaseRepository<ProviderDriver> {
  constructor(
    @InjectModel(ProviderDriver.name)
    private providerDriverSchema: AggregatePaginateModel<
      ProviderDriverDocument
    >,
  ) {
    super(providerDriverSchema);
  }

  async getDriversProviders(
    driver: ObjectID,
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<ProviderDriver>> {
    const aggregation = this.providerDriverSchema.aggregate([
      {
        $match: {
          driver,
          isBlocked: false,
        },
      },
      {
        $lookup: {
          from: 'drivers',
          localField: 'driver',
          foreignField: '_id',
          as: 'driver',
        },
      },
      {
        $unwind: '$driver',
      },
      { $replaceRoot: { newRoot: '$driver' } },
      {
        $project: { password: 0 },
      },
    ]);
    return await this.providerDriverSchema.aggregatePaginate(aggregation, {
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }
}

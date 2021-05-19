import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Pagination } from '../_common/utils/pagination';
import { ProviderDriver } from './models/provider-driver.schema';
import { ObjectID } from 'mongodb';
import { ProviderDriverDocument } from './models/provider-driver.schema';
@Injectable()
export class ProviderDriverRepository extends BaseRepository<ProviderDriver> {
  constructor(
    @InjectModel(ProviderDriver.name)
    private providerDriverSchema: PaginateModel<ProviderDriverDocument>,
  ) {
    super(providerDriverSchema);
  }

  async getDriversProviders(
    driver: ObjectID,
    pagination: Pagination,
  ): Promise<PaginateResult<ProviderDriver>> {
    return await this.providerDriverSchema.paginate(
      { driver, isBlocked: false },
      {
        offset: pagination.offset * pagination.limit,
        limit: pagination.limit,
      },
    );
  }
}

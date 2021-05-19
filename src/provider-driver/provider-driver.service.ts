import { Inject, Injectable } from '@nestjs/common';
import { ProviderDriverRepository } from './provider-driver.repository';
import { Pagination } from '../_common/utils/pagination';
import { ProviderDriver } from './models/provider-driver.schema';
import { PaginateResult } from 'mongoose';
import { RequestContext } from 'src/_common/request.interface';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class ProviderDriverService {
  constructor(
    private readonly providerDriverRepo: ProviderDriverRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async getDriversProviders(
    pagination: Pagination,
  ): Promise<PaginateResult<ProviderDriver>> {
    return await this.providerDriverRepo.getDriversProviders(
      this.request.currentUser._id,
      pagination,
    );
  }
}

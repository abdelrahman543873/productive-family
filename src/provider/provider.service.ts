import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/_common/request.interface';
import { ProviderRepository } from './provider.repository';
import { Pagination } from '../_common/utils/pagination.input';
import { AggregatePaginateResult } from 'mongoose';
import { Provider } from './models/provider.schema';

@Injectable()
export class ProviderService {
  constructor(
    private readonly providerRepo: ProviderRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async getNewProviders(
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<Provider>> {
    return await this.providerRepo.getNewProviders(
      this.request.currentUser.location.coordinates,
      pagination,
    );
  }
}

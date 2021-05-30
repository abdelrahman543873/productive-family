import { RequestContext } from 'src/_common/request.interface';
import { AggregatePaginateResult } from 'mongoose';
import { ProductDiscount } from './models/product-discount.schema';
import { Inject, Injectable } from '@nestjs/common';
import { ProductDiscountRepository } from './product-discount.repository';
import { Pagination } from '../_common/utils/pagination.input';
import { REQUEST } from '@nestjs/core';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';

@Injectable()
export class ProductDiscountService {
  constructor(
    private readonly productDiscountRepo: ProductDiscountRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async getDiscounts(
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<ProductDiscount>> {
    const coordinates = this.request?.currentUser?.location?.coordinates || [
      this.request.long,
      this.request.lat,
    ];
    if (!coordinates[0] || !coordinates[1])
      throw new BaseHttpException(this.request.lang, 612);
    return await this.productDiscountRepo.getDiscounts(coordinates, pagination);
  }
}

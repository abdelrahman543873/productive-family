import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AggregatePaginateResult } from 'mongoose';
import { RequestContext } from 'src/_common/request.interface';
import { OrderProductRepository } from './order-product.repository';
import { OrderProduct } from './order-product.schema';
import { BaseHttpException } from '../_common/exceptions/base-http-exception';
import { Pagination } from 'src/_common/utils/pagination.input';

@Injectable()
export class OrderProductService {
  constructor(
    private readonly orderProductRepository: OrderProductRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async getPopularProducts(
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<OrderProduct>> {
    const coordinates = this.request?.currentUser?.location?.coordinates || [
      this.request.long,
      this.request.lat,
    ];
    if (!coordinates[0] || !coordinates[1])
      throw new BaseHttpException(this.request.lang, 612);
    return await this.orderProductRepository.getPopularProducts(
      pagination,
      coordinates,
    );
  }
}

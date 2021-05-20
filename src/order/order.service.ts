import { Order } from './models/order.schema';
import { Inject, Injectable } from '@nestjs/common';
import { AggregatePaginateResult, PaginateResult } from 'mongoose';
import { OrderRepository } from './order.repository';
import { REQUEST } from '@nestjs/core';
import { Pagination } from '../_common/utils/pagination.input';
import { RequestContext } from 'src/_common/request.interface';
import { DriverOrdersFilterInput } from './inputs/drivers-orders-filter.input';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async getDriverOrders(
    input: DriverOrdersFilterInput,
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<Order>> {
    return await this.orderRepository.getDriverOrders(
      this.request.currentUser._id,
      pagination,
      input
    );
  }
}

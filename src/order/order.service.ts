import { Order } from './models/order.schema';
import { Inject, Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { OrderRepository } from './order.repository';
import { REQUEST } from '@nestjs/core';
import { Pagination } from '../_common/utils/pagination';
import { RequestContext } from 'src/_common/request.interface';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async getDriverOrders(input: Pagination): Promise<PaginateResult<Order>> {
    return await this.orderRepository.getDriverOrders(
      this.request.currentUser._id,
      input,
    );
  }
}

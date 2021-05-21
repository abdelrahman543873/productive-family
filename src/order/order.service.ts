import { Order } from './models/order.schema';
import { Inject, Injectable } from '@nestjs/common';
import { AggregatePaginateResult, PaginateResult } from 'mongoose';
import { OrderRepository } from './order.repository';
import { REQUEST } from '@nestjs/core';
import { Pagination } from '../_common/utils/pagination.input';
import { RequestContext } from 'src/_common/request.interface';
import { DriverOrdersFilterInput } from './inputs/drivers-orders-filter.input';
import { GetDriverOrderInput } from './inputs/get-driver-order.input';
import { addDeliveryFeesInput } from './inputs/add-delivery-fees.input';
import request from 'supertest';

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
      input,
    );
  }

  async getDriverOrder(input: GetDriverOrderInput): Promise<Order> {
    return await this.orderRepository.getDriverOrder(
      this.request.currentUser._id,
      input,
    );
  }

  async addDeliveryFees(input: addDeliveryFeesInput): Promise<Order> {
    return await this.orderRepository.addDeliveryFees(
      this.request.currentUser._id,
      input,
    );
  }
}

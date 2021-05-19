import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Order, OrderDocument } from './models/order.schema';
import { ObjectID } from 'mongodb';
import { Pagination } from 'src/_common/utils/pagination';
import { DriverOrdersFilterInput } from './inputs/drivers-orders-filter.input';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(
    @InjectModel(Order.name) private orderSchema: PaginateModel<OrderDocument>,
  ) {
    super(orderSchema);
  }

  async getDriverOrders(
    driver: ObjectID,
    pagination: Pagination,
    input: DriverOrdersFilterInput,
  ): Promise<PaginateResult<Order>> {
    return await this.orderSchema.paginate(
      { driver, ...(input.state && { state: input.state }) },
      {
        offset: pagination.offset * pagination.limit,
        limit: pagination.limit,
      },
    );
  }
}

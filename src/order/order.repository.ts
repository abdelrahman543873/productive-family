import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Order, OrderDocument } from './models/order.schema';
import { ObjectID } from 'mongodb';
import { Pagination } from 'src/_common/utils/pagination';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(
    @InjectModel(Order.name) private orderSchema: PaginateModel<OrderDocument>,
  ) {
    super(orderSchema);
  }

  async getDriverOrders(
    driver: ObjectID,
    input: Pagination,
  ): Promise<PaginateResult<Order>> {
    return await this.orderSchema.paginate(
      { driver },
      {
        offset: input.offset * input.limit,
        limit: input.limit,
      },
    );
  }
}

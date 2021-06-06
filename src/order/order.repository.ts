import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Order, OrderDocument } from './models/order.schema';
import { ObjectID } from 'mongodb';
import { Pagination } from 'src/_common/utils/pagination.input';
import { DriverOrdersFilterInput } from './inputs/drivers-orders-filter.input';
import { AggregatePaginateModel, AggregatePaginateResult } from 'mongoose';
import { GetDriverOrderInput } from './inputs/get-driver-order.input';
import { addDeliveryFeesInput } from './inputs/add-delivery-fees.input';
import { LookupSchemasEnum } from '../_common/app.enum';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(
    @InjectModel(Order.name)
    private orderSchema: AggregatePaginateModel<OrderDocument>,
  ) {
    super(orderSchema);
  }

  async getDriverOrders(
    driver: ObjectID,
    pagination: Pagination,
    input: DriverOrdersFilterInput,
  ): Promise<AggregatePaginateResult<Order>> {
    const aggregation = this.orderSchema.aggregate([
      {
        $match: {
          driver,
          ...(input.state && { state: input.state }),
          ...(input.provider && { provider: new ObjectID(input.provider) }),
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.OrderProduct,
          localField: '_id',
          foreignField: 'order',
          as: 'products',
        },
      },
      {
        $addFields: {
          total: { $sum: '$products.price' },
        },
      },
      {
        $project: { products: 0 },
      },
    ]);
    return await this.orderSchema.aggregatePaginate(aggregation, {
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }

  async getDriverOrder(
    driver: ObjectID,
    input: GetDriverOrderInput,
  ): Promise<Order> {
    return await this.orderSchema.findOne(
      {
        driver,
        _id: input.order,
      },
      {},
      { populate: 'client' },
    );
  }

  async addDeliveryFees(
    driver: ObjectID,
    input: addDeliveryFeesInput,
  ): Promise<Order> {
    return await this.orderSchema.findOneAndUpdate(
      { _id: input.order, driver },
      {
        deliveryFees: input.deliveryFees,
      },
      { lean: true, new: true },
    );
  }

  async getOrdersNumber(): Promise<number> {
    return await this.orderSchema.countDocuments({});
  }
}

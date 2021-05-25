import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, AggregatePaginateResult } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { OrderProductDocument, OrderProduct } from './order-product.schema';

@Injectable()
export class OrderProductRepository extends BaseRepository<OrderProduct> {
  constructor(
    @InjectModel(OrderProduct.name)
    private orderProductSchema: AggregatePaginateModel<OrderProductDocument>,
  ) {
    super(orderProductSchema);
  }

  async getPopularProducts(): Promise<AggregatePaginateResult<OrderProduct>> {
    const aggregation = this.orderProductSchema.aggregate([
      {
        $sortByCount: '$product',
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      { $replaceRoot: { newRoot: '$product' } },
    ]);
    return await this.orderProductSchema.aggregatePaginate(aggregation, {});
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, AggregatePaginateResult } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { OrderProductDocument, OrderProduct } from './order-product.schema';
import { LookupSchemasEnum } from '../_common/app.enum';
import { SpatialType } from 'src/_common/spatial-schemas/spatial.enum';

@Injectable()
export class OrderProductRepository extends BaseRepository<OrderProduct> {
  constructor(
    @InjectModel(OrderProduct.name)
    private orderProductSchema: AggregatePaginateModel<OrderProductDocument>,
  ) {
    super(orderProductSchema);
  }

  async getPopularProducts(
    coordinates: [number],
  ): Promise<AggregatePaginateResult<OrderProduct>> {
    const aggregation = this.orderProductSchema.aggregate([
      {
        $geoNear: {
          near: {
            type: SpatialType.Point,
            coordinates,
          },
          distanceField: 'distance',
          key: 'location',
          distanceMultiplier: 0.001,
        },
      },
      {
        $sortByCount: '$product',
      },
      {
        $lookup: {
          from: LookupSchemasEnum.Product,
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      { $replaceRoot: { newRoot: '$product' } },
      {
        $lookup: {
          from: LookupSchemasEnum.Provider,
          localField: 'provider',
          foreignField: '_id',
          as: 'provider',
        },
      },
      {
        $unwind: '$provider',
      },
      {
        $lookup: {
          from: LookupSchemasEnum.Category,
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $lookup: {
          from: LookupSchemasEnum.Discount,
          localField: 'discount',
          foreignField: '_id',
          as: 'discount',
        },
      },
      {
        $unwind: '$discount',
      },
    ]);
    return await this.orderProductSchema.aggregatePaginate(aggregation, {});
  }
}

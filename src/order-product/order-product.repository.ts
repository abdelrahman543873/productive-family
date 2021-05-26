import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, AggregatePaginateResult } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { OrderProductDocument, OrderProduct } from './order-product.schema';
import { LookupSchemasEnum } from '../_common/app.enum';
import { SpatialType } from 'src/_common/spatial-schemas/spatial.enum';
import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/_common/utils/pagination.input';

@Injectable()
export class OrderProductRepository extends BaseRepository<OrderProduct> {
  constructor(
    @InjectModel(OrderProduct.name)
    private orderProductSchema: AggregatePaginateModel<OrderProductDocument>,
  ) {
    super(orderProductSchema);
  }

  async getPopularProducts(
    pagination: Pagination,
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
          key: 'providerLocation',
          distanceMultiplier: 0.001,
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.Product,
          localField: 'product',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      {
        $lookup: {
          from: LookupSchemasEnum.Provider,
          localField: 'product.provider',
          foreignField: '_id',
          as: 'product.provider',
        },
      },
      {
        $unwind: '$product.provider',
      },
      {
        $match: {
          $expr: {
            $lte: ['$distance', '$product.provider.maxDistance'],
          },
        },
      },
      {
        $sortByCount: '$product._id',
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
      {
        $lookup: {
          from: LookupSchemasEnum.Provider,
          localField: 'product.provider',
          foreignField: '_id',
          as: 'product.provider',
        },
      },
      {
        $unwind: '$product.provider',
      },
      {
        $lookup: {
          from: LookupSchemasEnum.Category,
          localField: 'product.category',
          foreignField: '_id',
          as: 'product.category',
        },
      },
      {
        $unwind: '$product.category',
      },
      {
        $lookup: {
          from: LookupSchemasEnum.Discount,
          localField: 'product.discount',
          foreignField: '_id',
          as: 'product.discount',
        },
      },
      {
        $unwind: '$product.discount',
      },
      { $replaceRoot: { newRoot: '$product' } },
    ]);
    return await this.orderProductSchema.aggregatePaginate(aggregation, {
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }
}

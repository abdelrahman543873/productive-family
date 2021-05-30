import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AggregatePaginateModel,
  AggregatePaginateResult,
  Model,
} from 'mongoose';
import { LookupSchemasEnum } from 'src/_common/app.enum';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { SpatialType } from 'src/_common/spatial-schemas/spatial.enum';
import { Pagination } from 'src/_common/utils/pagination.input';
import {
  ProductDiscount,
  ProductDiscountDocument,
} from './models/product-discount.schema';

@Injectable()
export class ProductDiscountRepository extends BaseRepository<ProductDiscount> {
  constructor(
    @InjectModel(ProductDiscount.name)
    private productDiscountSchema: AggregatePaginateModel<
      ProductDiscountDocument
    >,
  ) {
    super(productDiscountSchema);
  }

  async getDiscounts(
    coordinates: [number],
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<ProductDiscount>> {
    const aggregation = this.productDiscountSchema.aggregate([
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
          localField: 'discount',
          foreignField: '_id',
          as: 'product.discount',
        },
      },
      {
        $unwind: '$product.discount',
      },
      {
        $lookup: {
          from: LookupSchemasEnum.Unit,
          localField: 'unit',
          foreignField: '_id',
          as: 'product.unit',
        },
      },
      {
        $unwind: '$product.unit',
      },
      { $replaceRoot: { newRoot: '$product' } },
    ]);
    return await this.productDiscountSchema.aggregatePaginate(aggregation, {
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }
}

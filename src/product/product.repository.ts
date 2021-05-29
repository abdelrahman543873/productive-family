import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, AggregatePaginateResult } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Product, ProductDocument } from './models/product.schema';
import { Pagination } from 'src/_common/utils/pagination.input';
import { LookupSchemasEnum } from 'src/_common/app.enum';
import { Category } from '../category/models/category.schema';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(
    @InjectModel(Product.name)
    private productSchema: AggregatePaginateModel<ProductDocument>,
  ) {
    super(productSchema);
  }

  async getLessThanPrice(
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<Product>> {
    const aggregation = this.productSchema.aggregate([
      {
        $match: {
          'info.price': { $lte: 50 },
          'info.amount': { $gt: 0 },
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.Provider,
          localField: 'provider',
          foreignField: '_id',
          as: 'provider',
        },
      },
      { $unwind: '$provider' },
      {
        $lookup: {
          from: LookupSchemasEnum.Category,
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
    ]);
    return await this.productSchema.aggregatePaginate(aggregation, {
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }
}

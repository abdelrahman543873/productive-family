import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, AggregatePaginateResult } from 'mongoose';
import { LessThanPriceInput } from 'src/product/inputs/less-than-price.input';
import { LookupSchemasEnum } from 'src/_common/app.enum';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Pagination } from 'src/_common/utils/pagination.input';
import { ProductUnit, ProductUnitDocument } from './models/product-unit.schema';

@Injectable()
export class ProductUnitRepository extends BaseRepository<ProductUnit> {
  constructor(
    @InjectModel(ProductUnit.name)
    private productUnitSchema: AggregatePaginateModel<ProductUnitDocument>,
  ) {
    super(productUnitSchema);
  }
  async getLessThanPrice(
    input: LessThanPriceInput,
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<ProductUnit>> {
    const aggregation = this.productUnitSchema.aggregate([
      {
        $match: {
          price: { $lte: +input.price },
          quantity: { $gt: 0 },
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
      { $unwind: '$product' },
      {
        $lookup: {
          from: LookupSchemasEnum.Provider,
          localField: 'product.provider',
          foreignField: '_id',
          as: 'product.provider',
        },
      },
      { $unwind: '$product.provider' },
      {
        $lookup: {
          from: LookupSchemasEnum.Category,
          localField: 'product.category',
          foreignField: '_id',
          as: 'product.category',
        },
      },
      { $unwind: '$product.category' },
      { $replaceRoot: { newRoot: '$product' } },
    ]);
    return await this.productUnitSchema.aggregatePaginate(aggregation, {
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { ProductUnitRepository } from './product-unit.repository';
import { ProductUnit } from './models/product-unit.schema';
import { AggregatePaginateResult } from 'mongoose';
import { LessThanPriceInput } from 'src/product/inputs/less-than-price.input';
import { Pagination } from 'src/_common/utils/pagination.input';

@Injectable()
export class ProductUnitService {
  constructor(private readonly productUnitRepo: ProductUnitRepository) {}

  async getLessThanPrice(
    input: LessThanPriceInput,
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<ProductUnit>> {
    return await this.productUnitRepo.getLessThanPrice(input, pagination);
  }
}

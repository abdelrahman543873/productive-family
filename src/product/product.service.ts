import { Injectable } from '@nestjs/common';
import { AggregatePaginateResult } from 'mongoose';
import { Pagination } from 'src/_common/utils/pagination.input';
import { Product } from './models/product.schema';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productProductRepo: ProductRepository) {}

  async getLessThanPrice(
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<Product>> {
    return await this.productProductRepo.getLessThanPrice(pagination);
  }
}

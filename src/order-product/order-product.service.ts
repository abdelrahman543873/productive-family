import { Injectable } from '@nestjs/common';
import { AggregatePaginateResult } from 'mongoose';
import { OrderProductRepository } from './order-product.repository';
import { OrderProduct } from './order-product.schema';

@Injectable()
export class OrderProductService {
  constructor(
    private readonly orderProductRepository: OrderProductRepository,
  ) {}

  async getPopularProducts(): Promise<AggregatePaginateResult<OrderProduct>> {
    return await this.orderProductRepository.getPopularProducts();
  }
}

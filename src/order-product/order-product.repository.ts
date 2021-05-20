import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { OrderProductDocument, OrderProduct } from './order-product.schema';

@Injectable()
export class OrderProductRepository extends BaseRepository<OrderProduct> {
  constructor(
    @InjectModel(OrderProduct.name)
    private orderProductSchema: Model<OrderProductDocument>,
  ) {
    super(orderProductSchema);
  }
}

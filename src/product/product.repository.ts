import { ObjectID } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Product, ProductDocument } from './models/product.schema';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(
    @InjectModel(Product.name)
    private productSchema: AggregatePaginateModel<ProductDocument>,
  ) {
    super(productSchema);
  }

  async getProduct(_id: ObjectID): Promise<Product> {
    return await this.productSchema.findOne({ _id });
  }
}

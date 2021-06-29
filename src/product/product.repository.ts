import { ObjectID } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Product, ProductDocument } from './models/product.schema';
import { ProviderAddProductInput } from './inputs/provider-add-product.input';
import { ConfigService } from '@nestjs/config';
import { File } from 'fastify-multer/lib/interfaces';
@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(
    @InjectModel(Product.name)
    private productSchema: AggregatePaginateModel<ProductDocument>,
    private configService: ConfigService,
  ) {
    super(productSchema);
  }

  async getProduct(_id: ObjectID): Promise<Product> {
    return await this.productSchema.findOne({ _id });
  }

  async providerAddProduct(
    provider: ObjectID,
    input: ProviderAddProductInput,
    files?: Array<File>,
  ): Promise<Product> {
    return await this.productSchema.create({
      provider,
      ...input,
      ...(files?.[0].path && {
        imagesURLs: files.map(
          file => this.configService.get<string>('IP') + file.filename,
        ),
      }),
    });
  }
}

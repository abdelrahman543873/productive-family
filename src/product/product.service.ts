import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/_common/request.interface';
import { ProviderAddProductInput } from './inputs/provider-add-product.input';
import { Product } from './models/product.schema';
import { ProductRepository } from './product.repository';
import { File } from 'fastify-multer/lib/interfaces';
@Injectable()
export class ProductService {
  constructor(
    private readonly productProductRepo: ProductRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async providerAddProduct(
    input: ProviderAddProductInput,
    files?: Array<File>,
  ): Promise<Product> {
    return await this.productProductRepo.providerAddProduct(
      this.request.currentUser._id,
      input,
      files,
    );
  }
}

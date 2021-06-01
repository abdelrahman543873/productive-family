import { Cart } from './models/cart.schema';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/_common/request.interface';
import { CartRepository } from './cart.repository';
import { AddToCartInput } from './inputs/add-to-cart.input';
import { BaseHttpException } from '../_common/exceptions/base-http-exception';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly productRepo: ProductRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}
  async addToCart(input: AddToCartInput): Promise<Cart> {
    const cartProduct = await this.cartRepo.getCartProduct(
      this.request.currentUser._id,
      input.product,
    );
    if (cartProduct) throw new BaseHttpException(this.request.lang, 615);
    const product = await this.productRepo.getProduct(input.product);
    if (!product) throw new BaseHttpException(this.request.lang, 616);
    const clientProduct = await this.cartRepo.getClientCartProduct(
      this.request.currentUser._id,
    );
    if (clientProduct && clientProduct['provider'] !== product.provider)
      throw new BaseHttpException(this.request.lang, 617);
    return await this.cartRepo.addToCart(this.request.currentUser._id, input);
  }
}

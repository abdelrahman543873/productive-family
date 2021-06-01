import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { AddToCartInput } from './inputs/add-to-cart.input';
import { Cart, CartDocument } from './models/cart.schema';
import { ObjectID } from 'mongodb';
import { Product } from 'src/product/models/product.schema';

@Injectable()
export class CartRepository extends BaseRepository<Cart> {
  constructor(@InjectModel(Cart.name) private cartSchema: Model<CartDocument>) {
    super(cartSchema);
  }

  async addToCart(client: ObjectID, input: AddToCartInput): Promise<Cart> {
    return await this.cartSchema.create({
      client,
      product: input.product,
      amount: input.amount,
    });
  }

  async getCartProduct(client: ObjectID, product: ObjectID): Promise<Cart> {
    return await this.cartSchema.findOne({
      client: new ObjectID(client),
      product: new ObjectID(product),
    });
  }

  async getClientCartProduct(client: ObjectID): Promise<Cart> {
    return await this.cartSchema.findOne(
      {
        client: new ObjectID(client),
      },
      { amount: 0, client: 0 },
      { populate: 'product' },
    );
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, AggregatePaginateResult } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { AddToCartInput } from './inputs/add-to-cart.input';
import { Cart, CartDocument } from './models/cart.schema';
import { ObjectID } from 'mongodb';
import { Pagination } from 'src/_common/utils/pagination.input';
import { LookupSchemasEnum } from 'src/_common/app.enum';
@Injectable()
export class CartRepository extends BaseRepository<Cart> {
  constructor(
    @InjectModel(Cart.name)
    private cartSchema: AggregatePaginateModel<CartDocument>,
  ) {
    super(cartSchema);
  }

  async addToCart(client: ObjectID, input: AddToCartInput): Promise<Cart> {
    return await this.cartSchema.create({
      client,
      unit: input.unit,
      amount: input.amount,
      product: input.product,
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

  async clearClientCart(client: ObjectID): Promise<Record<any, any>> {
    return await this.cartSchema.deleteMany({
      client: new ObjectID(client),
    });
  }

  async getClientCartProductsForCheckout(client: ObjectID): Promise<Cart[]> {
    return await this.cartSchema
      .find(
        {
          client: new ObjectID(client),
        },
        { client: 0, _id: 0 },
      )
      .populate({
        path: 'product',
        populate: {
          path: 'provider',
          select: { password: 0 },
        },
      });
  }

  async getCart(
    client: ObjectID,
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<Cart>> {
    const aggregation = this.cartSchema.aggregate([
      {
        $match: {
          client: new ObjectID(client),
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
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$product', '$$ROOT'],
          },
        },
      },
      { $project: { client: 0, _id: 0, product: 0 } },
      {
        $lookup: {
          from: LookupSchemasEnum.Provider,
          localField: 'provider',
          foreignField: '_id',
          as: 'provider',
        },
      },
      { $unwind: '$provider' },
      {
        $lookup: {
          from: LookupSchemasEnum.Category,
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
    ]);
    return await this.cartSchema.aggregatePaginate(aggregation, {
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }
}

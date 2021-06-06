import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Discount, DiscountDocument } from './models/discount.schema';
@Injectable()
export class DiscountRepository extends BaseRepository<Discount> {
  constructor(
    @InjectModel(Discount.name) private discountSchema: Model<DiscountDocument>,
  ) {
    super(discountSchema);
  }

  async getActiveDiscountByCode(code: string): Promise<Discount> {
    return await this.discountSchema.findOne({
      code,
      expiryDate: { $gte: new Date(Date.now()) },
    });
  }
}

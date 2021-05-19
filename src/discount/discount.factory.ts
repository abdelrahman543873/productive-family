import { ObjectID } from 'mongodb';
import * as faker from 'faker';
import { Discount } from './models/discount.schema';
import { providerFactory } from '../provider/provider.factory';
import { DiscountRepo } from '../../test/discount/discount-test-repo';

interface DiscountType {
  provider?: ObjectID;
  code?: string;
  amount?: number;
  expiryDate?: Date;
  isActive?: boolean;
}

export const buildDiscountParams = async (
  obj: DiscountType = {},
): Promise<Discount> => {
  return {
    provider: obj.provider || (await providerFactory())._id,
    code: obj.code || faker.random.word(),
    amount: obj.amount || faker.datatype.number(),
    expiryDate: obj.expiryDate || faker.date.recent(),
    isActive: obj.isActive ?? true,
  };
};

export const discountsFactory = async (
  count = 10,
  obj: DiscountType = {},
): Promise<Discount[]> => {
  const discounts: Discount[] = [];
  for (let i = 0; i < count; i++) {
    discounts.push(await buildDiscountParams(obj));
  }
  return (await DiscountRepo()).addMany(discounts);
};

export const discountFactory = async (
  obj: DiscountType = {},
): Promise<Discount> => {
  const params: Discount = await buildDiscountParams(obj);
  return (await DiscountRepo()).add(params);
};

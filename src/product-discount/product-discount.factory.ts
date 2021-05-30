import { ObjectID } from 'mongodb';
import * as faker from 'faker';
import { ProductDiscount } from './models/product-discount.schema';
import { Point } from 'src/_common/spatial-schemas/point.schema';
import { productFactory } from '../product/product.factory';
import { discountFactory } from '../discount/discount.factory';
import { SpatialType } from 'src/_common/spatial-schemas/spatial.enum';
import { ProductDiscountRepo } from '../../test/product-discount/product-discount-test-repo';
import { unitFactory } from '../unit/unit.factory';

interface ProductDiscountType {
  product?: ObjectID;
  discount?: ObjectID;
  providerLocation?: Point;
  unit?: ObjectID;
}

export const buildProductDiscountParams = async (
  obj: ProductDiscountType = {},
): Promise<ProductDiscount> => {
  return {
    unit: obj.unit || (await unitFactory())._id,
    product: obj.product || (await productFactory())._id,
    discount: obj.discount || (await discountFactory())._id,
    providerLocation: obj.providerLocation || {
      type: SpatialType.Point,
      coordinates: [+faker.address.longitude(), +faker.address.latitude()],
    },
  };
};

export const productDiscountsFactory = async (
  count = 10,
  obj: ProductDiscountType = {},
): Promise<ProductDiscount[]> => {
  const discounts: ProductDiscount[] = [];
  for (let i = 0; i < count; i++) {
    discounts.push(await buildProductDiscountParams(obj));
  }
  return (await ProductDiscountRepo()).addMany(discounts);
};

export const productDiscountFactory = async (
  obj: ProductDiscountType = {},
): Promise<ProductDiscount> => {
  const params: ProductDiscount = await buildProductDiscountParams(obj);
  return (await ProductDiscountRepo()).add(params);
};

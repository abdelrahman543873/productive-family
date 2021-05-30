import * as faker from 'faker';
import { ObjectID } from 'mongodb';
import { unitFactory } from '../unit/unit.factory';
import { ProductUnit } from './models/product-unit.schema';
import { productFactory } from '../product/product.factory';
import { ProductUnitRepo } from 'test/product-unit/product-unit-test-repo';

interface ProductUnitType {
  product?: ObjectID;
  unit?: ObjectID;
  price?: number;
  amount?: number;
}

export const buildProductUnitParams = async (
  obj: ProductUnitType = {},
): Promise<ProductUnit> => {
  return {
    product: obj.product || (await productFactory())._id,
    unit: obj.unit || (await unitFactory())._id,
    price: obj.price || +faker.commerce.price(),
    amount: obj.amount || faker.datatype.number(),
  };
};

export const productUnitsFactory = async (
  count = 10,
  obj: ProductUnitType = {},
): Promise<ProductUnit[]> => {
  const productUnits: ProductUnit[] = [];
  for (let i = 0; i < count; i++) {
    productUnits.push(await buildProductUnitParams(obj));
  }
  return (await ProductUnitRepo()).addMany(productUnits);
};

export const productUnitFactory = async (
  obj: ProductUnitType = {},
): Promise<ProductUnit> => {
  const params: ProductUnit = await buildProductUnitParams(obj);
  return (await ProductUnitRepo()).add(params);
};

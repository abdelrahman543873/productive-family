import { ObjectID } from 'mongodb';
import * as faker from 'faker';
import { Cart } from './models/cart.schema';
import { clientFactory } from '../client/client.factory';
import { productFactory } from '../product/product.factory';
import { CartRepo } from 'test/cart/cart-test-repo';
import { unitFactory } from '../unit/unit.factory';

interface CartType {
  amount?: number;
  unit?: ObjectID;
  client?: ObjectID;
  product?: ObjectID;
}

export const buildCartParams = async (obj: CartType = {}): Promise<Cart> => {
  return {
    client: obj.client || (await clientFactory())._id,
    product: obj.product || (await productFactory())._id,
    amount: obj.amount || faker.datatype.number(),
    unit: obj.unit || (await unitFactory())._id,
  };
};

export const cartsFactory = async (
  count = 10,
  obj: CartType = {},
): Promise<Cart[]> => {
  const carts: Cart[] = [];
  for (let i = 0; i < count; i++) {
    carts.push(await buildCartParams(obj));
  }
  return (await CartRepo()).addMany(carts);
};

export const cartFactory = async (obj: CartType = {}): Promise<Cart> => {
  const params: Cart = await buildCartParams(obj);
  return (await CartRepo()).add(params);
};

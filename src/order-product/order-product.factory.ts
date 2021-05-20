import { ObjectID } from 'mongodb';
import { OrderProduct } from './order-product.schema';
import { orderFactory } from '../order/order.factory';
import { productFactory } from '../product/product.factory';
import { OrderProductRepo } from '../../test/order-product/order-product-test-repo';
import * as faker from 'faker';

interface OrderProductType {
  price?: number;
  order?: ObjectID;
  product?: ObjectID;
}

export const buildOrderProductParams = async (
  obj: OrderProductType = {},
): Promise<OrderProduct> => {
  return {
    order: obj.order || (await orderFactory())._id,
    product: obj.product || (await productFactory())._id,
    price: obj.price || parseFloat(faker.commerce.price()),
  };
};

export const orderProductsFactory = async (
  count = 10,
  obj: OrderProductType = {},
): Promise<OrderProduct[]> => {
  const orderProducts: OrderProduct[] = [];
  for (let i = 0; i < count; i++) {
    orderProducts.push(await buildOrderProductParams(obj));
  }
  return (await OrderProductRepo()).addMany(orderProducts);
};

export const orderProductFactory = async (
  obj: OrderProductType = {},
): Promise<OrderProduct> => {
  const params: OrderProduct = await buildOrderProductParams(obj);
  return (await OrderProductRepo()).add(params);
};

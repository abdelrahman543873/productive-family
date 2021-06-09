import { ObjectID } from 'mongodb';
import * as faker from 'faker';
import { getValuesFromEnum } from 'src/_common/utils/column-enum';
import { Order } from './models/order.schema';
import { OrderEnum } from './order.enum';
import { driverFactory } from '../driver/driver.factory';
import { clientFactory } from '../client/client.factory';
import { OrderRepo } from '../../test/orders/order-test-repo';
import { paymentFactory } from '../payment/payment.factory';
import { addressFactory } from '../address/address.factory';
import { discountFactory } from '../discount/discount.factory';
import { providerFactory } from '../provider/provider.factory';

interface OrderParamsType {
  client?: ObjectID;
  driver?: ObjectID;
  payment?: ObjectID;
  address?: ObjectID;
  provider?: ObjectID;
  discount?: ObjectID;
  orderNumber?: number;
  deliveryFees?: number;
  state?: OrderEnum;
  transactionId?: string;
  note?: string;
  estimatedTime?: Date;
}

export const buildOrderParams = async (
  obj: OrderParamsType = {},
): Promise<Order> => {
  return {
    note: obj.note || faker.random.words(),
    client: obj.client || (await clientFactory())._id,
    driver: obj.driver || (await driverFactory())._id,
    payment: obj.payment || (await paymentFactory())._id,
    address: obj.address || (await addressFactory())._id,
    provider: obj.provider || (await providerFactory())._id,
    discount: obj.discount || (await discountFactory())._id,
    estimatedTime: obj.estimatedTime || faker.date.recent(),
    orderNumber: obj.orderNumber || faker.datatype.number(),
    transactionId: obj.transactionId || faker.finance.iban(),
    deliveryFees: obj.deliveryFees || faker.datatype.number(),
    state:
      obj.state ||
      (faker.random.arrayElement(getValuesFromEnum(OrderEnum)) as OrderEnum),
  };
};

export const ordersFactory = async (
  count = 10,
  obj: OrderParamsType = {},
): Promise<Order[]> => {
  const orders: Order[] = [];
  for (let i = 0; i < count; i++) {
    orders.push(await buildOrderParams(obj));
  }
  return (await OrderRepo()).addMany(orders);
};

export const orderFactory = async (
  obj: OrderParamsType = {},
): Promise<Order> => {
  const params: Order = await buildOrderParams(obj);
  return (await OrderRepo()).add(params);
};

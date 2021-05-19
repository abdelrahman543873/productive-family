import { ObjectID } from 'mongodb';
import * as faker from 'faker';
import { getValuesFromEnum } from 'src/_common/utils/column-enum';
import { Order } from './models/order.schema';
import { OrderEnum } from './order.enum';
import { driverFactory } from '../driver/driver.factory';
import { clientFactory } from '../client/client.factory';
import { OrderRepo } from '../../test/orders/order-test-repo';

interface OrderParamsType {
  client?: ObjectID;
  driver?: ObjectID;
  payment?: ObjectID;
  address?: ObjectID;
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
  const something = (await driverFactory())._id;
  return {
    client: obj.client || (await clientFactory())._id,
    driver: obj.driver || something,
    payment: obj.payment || something,
    address: obj.address || something,
    discount: obj.discount || something,
    orderNumber: obj.orderNumber || faker.datatype.number(),
    deliveryFees: obj.deliveryFees || faker.datatype.number(),
    state: obj.state || faker.random.arrayElement(getValuesFromEnum(OrderEnum)),
    transactionId: obj.transactionId || faker.finance.iban(),
    note: obj.note || faker.random.words(),
    estimatedTime: obj.estimatedTime || faker.date.recent(),
  };
};

export const ordersFactory = async (
  count = 10,
  obj: OrderParamsType = {},
): Promise<Order[]> => {
  const faqs: Order[] = [];
  for (let i = 0; i < count; i++) {
    faqs.push(await buildOrderParams(obj));
  }
  return (await OrderRepo()).addMany(faqs);
};

export const orderFactory = async (
  obj: OrderParamsType = {},
): Promise<Order> => {
  const params: Order = await buildOrderParams(obj);
  return (await OrderRepo()).add(params);
};

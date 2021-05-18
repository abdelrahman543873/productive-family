import * as faker from 'faker';
import { UserRoleEnum } from 'src/_common/app.enum';
import { getValuesFromEnum } from 'src/_common/utils/column-enum';
import { FaqRepo } from 'test/faq/faq-test-repo';
import { Order } from './models/order.schema';
import { clientFactory } from '../client/client.factory';
import { OrderEnum } from './order.enum';

export const buildOrderParams = async (obj = <any>{}): Promise<Order> => {
  const something = (await clientFactory())._id;
  return {
    client: obj.client || something,
    products: obj.product || [something],
    driver: obj.driver || something,
    payment: obj.payment || something,
    address: obj.address || something,
    discount: obj.discount || something,
    orderNumber: obj.orderNumber || something,
    deliveryFees: obj.deliveryFees || faker.datatype.number(),
    state: obj.state || faker.random.arrayElement(getValuesFromEnum(OrderEnum)),
    transactionId: obj.transactionId || faker.finance.iban(),
    note: obj.note || faker.random.words(),
    estimatedTime: obj.estimatedTime || faker.datatype.number(),
  };
};

export const faqsFactory = async (
  count = 10,
  obj = <any>{},
): Promise<Faq[]> => {
  const faqs: Faq[] = [];
  for (let i = 0; i < count; i++) {
    faqs.push(buildFaqParams(obj));
  }
  return (await FaqRepo()).addMany(faqs);
};

export const FaqFactory = async (obj = <any>{}): Promise<Faq> => {
  const params: Faq = buildFaqParams(obj);
  return (await FaqRepo()).add(params);
};

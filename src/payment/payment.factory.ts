import { Payment } from './models/payment.schema';
import * as faker from 'faker';
import { getValuesFromEnum } from 'src/_common/utils/column-enum';
import { PaymentEnum } from './payment.enum';
import { PaymentRepo } from '../../test/payment/payment-test-repo';

interface paymentType {
  enName?: string;
  arName?: string;
  isActive?: boolean;
  type?: PaymentEnum;
  imageURL?: string;
}

export const buildPaymentParams = (obj: paymentType = {}): Payment => {
  return {
    enName: obj.enName || faker.random.words(),
    arName: obj.arName || faker.random.words(),
    isActive: obj.isActive || true,
    type: obj.type || faker.random.arrayElement(getValuesFromEnum(PaymentEnum)),
    imageURL: obj.imageURL || faker.internet.url(),
  };
};

export const paymentsFactory = async (
  count = 10,
  obj: paymentType = {},
): Promise<Payment[]> => {
  const payments: Payment[] = [];
  for (let i = 0; i < count; i++) {
    payments.push(buildPaymentParams(obj));
  }
  return (await PaymentRepo()).addMany(payments);
};

export const paymentFactory = async (obj = <any>{}): Promise<Payment> => {
  const params: Payment = buildPaymentParams(obj);
  return (await PaymentRepo()).add(params);
};

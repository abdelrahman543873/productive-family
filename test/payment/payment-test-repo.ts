import { moduleRef } from 'test/before-test-run';
import { PaymentRepository } from '../../src/payment/payment.repository';

export const PaymentRepo = async (): Promise<PaymentRepository> =>
  (await moduleRef()).get<PaymentRepository>(PaymentRepository);

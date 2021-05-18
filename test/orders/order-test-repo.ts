import { moduleRef } from 'test/before-test-run';
import { OrderRepository } from '../../src/order/order.repository';

export const OrderRepo = async (): Promise<OrderRepository> =>
  (await moduleRef()).get<OrderRepository>(OrderRepository);

import { moduleRef } from 'test/before-test-run';
import { OrderProductRepository } from '../../src/order-product/order-product.repository';

export const OrderProductRepo = async (): Promise<OrderProductRepository> =>
  (await moduleRef()).get<OrderProductRepository>(OrderProductRepository);

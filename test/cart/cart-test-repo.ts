import { moduleRef } from 'test/before-test-run';
import { CartRepository } from '../../src/cart/cart.repository';

export const CartRepo = async (): Promise<CartRepository> =>
  (await moduleRef()).get<CartRepository>(CartRepository);

import { OrderProductRepo } from './order-product-test-repo';
import { ClientRepo } from '../client/client-test-repo';

export async function rollbackDbForOrderProduct(): Promise<void> {
  await (await OrderProductRepo()).rawDelete();
  await (await ClientRepo()).rawDelete();
}

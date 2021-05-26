import { OrderProductRepo } from './order-product-test-repo';
import { ClientRepo } from '../client/client-test-repo';
import { ProductRepo } from '../product/product-test-repo';
import { OrderRepo } from '../orders/order-test-repo';

export async function rollbackDbForOrderProduct(): Promise<void> {
  await (await OrderProductRepo()).rawDelete();
  await (await ProductRepo()).rawDelete();
  await (await OrderRepo()).rawDelete();
  await (await ClientRepo()).rawDelete();
}

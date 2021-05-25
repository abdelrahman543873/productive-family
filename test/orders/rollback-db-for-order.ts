import { DriverRepo } from '../driver/driver-test-repo';
import { ClientRepo } from '../client/client-test-repo';
import { OrderRepo } from './order-test-repo';
import { OrderProductRepo } from '../order-product/order-product-test-repo';
import { ProviderRepo } from 'test/provider/provider-test-repo';

export async function rollbackDbForOrder(): Promise<void> {
  await (await OrderProductRepo()).rawDelete();
  await (await OrderRepo()).rawDelete();
  await (await DriverRepo()).rawDelete();
  await (await ProviderRepo()).rawDelete();
  await (await ClientRepo()).rawDelete();
}

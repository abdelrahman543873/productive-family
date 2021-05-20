import { DriverRepo } from './driver-test-repo';
import { ProviderRepo } from '../provider/provider-test-repo';
import { OrderRepo } from '../orders/order-test-repo';
import { ProviderDriverRepo } from '../provider-driver/provider-driver-test-repo';

export async function rollbackDbForDriver(): Promise<void> {
  await (await ProviderDriverRepo()).rawDelete();
  await (await OrderRepo()).rawDelete();
  await (await ProviderRepo()).rawDelete();
  await (await DriverRepo()).rawDelete();
}

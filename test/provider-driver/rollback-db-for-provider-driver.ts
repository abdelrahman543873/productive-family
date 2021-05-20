import { DriverRepo } from 'test/driver/driver-test-repo';
import { ProviderRepo } from '../provider/provider-test-repo';
import { ProviderDriverRepo } from './provider-driver-test-repo';

export async function rollbackDbForProviderDriver(): Promise<void> {
  await (await ProviderDriverRepo()).rawDelete();
  await (await ProviderRepo()).rawDelete();
  await (await DriverRepo()).rawDelete();
}

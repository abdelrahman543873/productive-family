import { DriverRepo } from '../driver/driver-test-repo';
import { ClientRepo } from '../client/client-test-repo';
import { ProviderRepo } from '../provider/provider-test-repo';
import { AdminRepo } from '../user/user-test-repo';
export async function rollbackDbForAuth(): Promise<void> {
  await (await AdminRepo()).rawDelete();
  await (await ProviderRepo()).rawDelete();
  await (await ClientRepo()).rawDelete();
  await (await DriverRepo()).rawDelete();
}

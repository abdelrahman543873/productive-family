import { ClientRepo } from '../client/client-test-repo';
import { ProviderRepo } from './provider-test-repo';

export async function rollbackDbForProvider(): Promise<void> {
  await (await ProviderRepo()).rawDelete();
  await (await ClientRepo()).rawDelete();
}

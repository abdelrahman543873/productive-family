import { ClientRepo } from './client-test-repo';
export async function rollbackDbForClient(): Promise<void> {
  await (await ClientRepo()).rawDelete();
}

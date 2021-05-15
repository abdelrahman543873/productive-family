import { verificationRepo } from './verification-test-repo';

export async function rollbackDbForVerification(): Promise<void> {
  await (await verificationRepo()).rawDelete();
}

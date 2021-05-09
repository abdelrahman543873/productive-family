import { DriverRepo } from './driver-test-repo';

export async function rollbackDbForDriver(): Promise<void> {
  await (await DriverRepo()).rawDelete();
}

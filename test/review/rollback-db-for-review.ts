import { ReviewRepo } from './review-test-repo';
import { DriverRepo } from '../driver/driver-test-repo';
import { ClientRepo } from '../client/client-test-repo';

export async function rollbackDbForReview(): Promise<void> {
  await (await ReviewRepo()).rawDelete();
  await (await DriverRepo()).rawDelete();
  await (await ClientRepo()).rawDelete();
}

import { FaqRepo } from './faq-test-repo';

export async function rollbackDbForFaq(): Promise<void> {
  await (await FaqRepo()).rawDelete();
}

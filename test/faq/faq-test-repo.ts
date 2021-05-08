import { FaqRepository } from 'src/faq/faq.repository';
import { moduleRef } from 'test/before-test-run';

export const FaqRepo = async (): Promise<FaqRepository> =>
  (await moduleRef()).get<FaqRepository>(FaqRepository);

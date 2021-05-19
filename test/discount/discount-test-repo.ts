import { moduleRef } from 'test/before-test-run';
import { DiscountRepository } from '../../src/discount/driver.repository';

export const DiscountRepo = async (): Promise<DiscountRepository> =>
  (await moduleRef()).get<DiscountRepository>(DiscountRepository);

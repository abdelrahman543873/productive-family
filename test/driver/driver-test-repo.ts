import { moduleRef } from 'test/before-test-run';
import { DriverRepository } from '../../src/driver/driver.repository';

export const DriverRepo = async (): Promise<DriverRepository> =>
  (await moduleRef()).get<DriverRepository>(DriverRepository);

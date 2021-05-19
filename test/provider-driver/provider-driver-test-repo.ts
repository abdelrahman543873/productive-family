import { ProviderDriverRepository } from 'src/provider-driver/provider-driver.repository';
import { moduleRef } from 'test/before-test-run';

export const ProviderDriverRepo = async (): Promise<ProviderDriverRepository> =>
  (await moduleRef()).get<ProviderDriverRepository>(ProviderDriverRepository);

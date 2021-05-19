import { moduleRef } from 'test/before-test-run';
import { ProviderRepository } from '../../src/provider/provider.repository';

export const ProviderRepo = async (): Promise<ProviderRepository> =>
  (await moduleRef()).get<ProviderRepository>(ProviderRepository);

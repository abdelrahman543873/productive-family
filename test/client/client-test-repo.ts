import { moduleRef } from 'test/before-test-run';
import { ClientRepository } from '../../src/client/client.repository';

export const ClientRepo = async (): Promise<ClientRepository> =>
  (await moduleRef()).get<ClientRepository>(ClientRepository);

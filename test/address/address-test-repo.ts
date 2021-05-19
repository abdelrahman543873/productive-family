import { moduleRef } from 'test/before-test-run';
import { AddressRepository } from '../../src/address/address.repository';

export const AddressRepo = async (): Promise<AddressRepository> =>
  (await moduleRef()).get<AddressRepository>(AddressRepository);

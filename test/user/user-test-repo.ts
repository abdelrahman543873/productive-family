import { moduleRef } from 'test/before-test-run';
import { UserRepository } from '../../src/user/user.repository';

export const UserRepo = async (): Promise<UserRepository> =>
  (await moduleRef()).get<UserRepository>(UserRepository);

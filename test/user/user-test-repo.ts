import { AdminRepository } from './../../src/admin/admin.repository';
import { moduleRef } from 'test/before-test-run';

export const AdminRepo = async (): Promise<AdminRepository> =>
  (await moduleRef()).get<AdminRepository>(AdminRepository);

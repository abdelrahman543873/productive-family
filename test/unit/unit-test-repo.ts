import { moduleRef } from 'test/before-test-run';
import { UnitRepository } from '../../src/unit/unit.repository';

export const UnitRepo = async (): Promise<UnitRepository> =>
  (await moduleRef()).get<UnitRepository>(UnitRepository);

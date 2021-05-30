import * as faker from 'faker';
import { ObjectID } from 'mongodb';
import { Unit } from './models/unit.schema';
import { providerFactory } from '../provider/provider.factory';
import { UnitRepo } from '../../test/unit/unit-test-repo';

interface UnitType {
  enUnit?: string;
  arUnit?: string;
  provider?: ObjectID;
}

export const buildUnitParams = async (obj: UnitType = {}): Promise<Unit> => {
  return {
    enUnit: obj.enUnit || faker.random.word(),
    arUnit: obj.arUnit || faker.random.word(),
    provider: obj.provider || (await providerFactory())._id,
  };
};

export const unitsFactory = async (
  count = 10,
  obj: UnitType = {},
): Promise<Unit[]> => {
  const units: Unit[] = [];
  for (let i = 0; i < count; i++) {
    units.push(await buildUnitParams(obj));
  }
  return (await UnitRepo()).addMany(units);
};

export const unitFactory = async (obj: UnitType = {}): Promise<Unit> => {
  const params: Unit = await buildUnitParams(obj);
  return (await UnitRepo()).add(params);
};

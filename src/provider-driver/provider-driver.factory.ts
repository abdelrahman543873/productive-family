import { ObjectID } from 'mongodb';
import { ProviderDriver } from './models/provider-driver.schema';
import { driverFactory } from '../driver/driver.factory';
import { ProviderDriverRepo } from 'test/provider-driver/provider-driver-test-repo';

interface ProviderDriverType {
  provider?: ObjectID;
  driver?: ObjectID;
  isActive?: boolean;
  isBlocked?: boolean;
}

export const buildProviderDriverParams = async (
  obj: ProviderDriverType = {},
): Promise<ProviderDriver> => {
  return {
    provider: obj.provider || (await driverFactory())._id,
    driver: obj.driver || (await driverFactory())._id,
    isActive: obj.isActive || true,
    isBlocked: obj.isBlocked || false,
  };
};

export const providerDriversFactory = async (
  count = 10,
  obj: ProviderDriverType = {},
): Promise<ProviderDriver[]> => {
  const providerDrivers: ProviderDriver[] = [];
  for (let i = 0; i < count; i++) {
    providerDrivers.push(await buildProviderDriverParams(obj));
  }
  return (await ProviderDriverRepo()).addMany(providerDrivers);
};

export const providerDriverFactory = async (
  obj: ProviderDriverType = {},
): Promise<ProviderDriver> => {
  const params: ProviderDriver = await buildProviderDriverParams(obj);
  return (await ProviderDriverRepo()).add(params);
};

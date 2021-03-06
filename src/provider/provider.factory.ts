import * as faker from 'faker';
import { UserRoleEnum } from 'src/_common/app.enum';
import { Point } from '../_common/spatial-schemas/point.schema';
import { ObjectID } from 'mongodb';
import { Provider } from './models/provider.schema';
import { SpatialType } from 'src/_common/spatial-schemas/spatial.enum';
import { paymentFactory } from '../payment/payment.factory';
import { ProviderRepo } from 'test/provider/provider-test-repo';
import { hashPass } from 'src/_common/utils/bcryptHelper';
import { generateAuthToken } from 'src/_common/utils/token-utils';

interface ProviderType {
  name?: string;
  email?: string;
  mobile?: string;
  slogan?: string;
  location?: Point;
  password?: string;
  isActive?: boolean;
  role?: UserRoleEnum;
  maxDistance?: number;
  isVerified?: boolean;
  acceptedPaymentMethods?: ObjectID[];
}

export const buildProviderParams = async (
  obj: ProviderType = {},
): Promise<Provider> => {
  return {
    isActive: obj.isActive ?? true,
    isVerified: obj.isVerified ?? true,
    name: obj.name || faker.random.word(),
    role: obj.role || UserRoleEnum.PROVIDER,
    email: obj.email || faker.internet.email(),
    slogan: obj.slogan || faker.random.words(),
    password: obj.password || faker.internet.password(),
    maxDistance: obj.maxDistance || faker.datatype.number(5),
    acceptedPaymentMethods: obj.acceptedPaymentMethods || [
      (await paymentFactory())._id,
    ],
    mobile: obj.mobile || faker.phone.phoneNumber('+20100#######'),
    location: obj.location || {
      type: SpatialType.Point,
      coordinates: [+faker.address.longitude(), +faker.address.latitude()],
    },
  };
};

export const providersFactory = async (
  count = 10,
  obj: ProviderType = {},
): Promise<Provider[]> => {
  const providers: Provider[] = [];
  for (let i = 0; i < count; i++) {
    providers.push(await buildProviderParams(obj));
  }
  return (await ProviderRepo()).addMany(providers);
};

export const providerFactory = async (
  obj: ProviderType = {},
): Promise<Provider> => {
  const params: Provider = await buildProviderParams(obj);
  params.password = await hashPass(params.password);
  const provider = await (await ProviderRepo()).add(params);
  provider.token = generateAuthToken(provider._id);
  return provider;
};

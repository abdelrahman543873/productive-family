import * as faker from 'faker';
import { UserRoleEnum } from 'src/_common/app.enum';
import { Point } from '../_common/spatial-schemas/point.schema';
import { ObjectID } from 'mongodb';
import { Provider } from './models/provider.schema';
import { SpatialType } from 'src/_common/spatial-schemas/spatial.enum';
import { paymentFactory } from '../payment/payment.factory';
import { ProviderRepo } from 'test/provider/provider-test-repo';

interface ProviderType {
  name?: string;
  email?: string;
  mobile?: string;
  slogan?: string;
  location?: Point;
  password?: string;
  rating?: number;
  isActive?: boolean;
  isVerified?: boolean;
  acceptedPaymentMethods?: ObjectID[];
  role?: UserRoleEnum;
}

export const buildProviderParams = async (
  obj: ProviderType = {},
): Promise<Provider> => {
  return {
    name: obj.name || faker.random.word(),
    email: obj.email || faker.random.words(),
    mobile: obj.mobile || faker.phone.phoneNumber('+20100#######'),
    slogan: obj.slogan || faker.random.words(),
    location: obj.location || {
      type: SpatialType.Point,
      coordinates: [+faker.address.longitude(), +faker.address.latitude()],
    },
    isActive: obj.isActive ?? true,
    isVerified: obj.isVerified ?? true,
    password: obj.password || faker.internet.password(),
    rating: obj.rating || faker.datatype.number(5),
    acceptedPaymentMethods: obj.acceptedPaymentMethods || [
      (await paymentFactory())._id,
    ],
    role: obj.role || UserRoleEnum.PROVIDER,
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
  return (await ProviderRepo()).add(params);
};

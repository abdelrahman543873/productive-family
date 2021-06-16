import * as faker from 'faker';
import { UserRoleEnum } from 'src/_common/app.enum';
import { hashPass } from 'src/_common/utils/bcryptHelper';
import { generateAuthToken } from '../_common/utils/token-utils';
import { Client } from './models/client.schema';
import { getValuesFromEnum } from '../_common/utils/column-enum';
import { SocialMediaType } from './social-media.enum';
import { ObjectID } from 'mongodb';
import { ClientRepo } from '../../test/client/client-test-repo';
import { Point } from 'src/_common/spatial-schemas/point.schema';
import { SpatialType } from 'src/_common/spatial-schemas/spatial.enum';
import { productFactory } from '../product/product.factory';

interface clientType {
  email?: string;
  mobile?: string;
  name?: string;
  password?: string;
  role?: UserRoleEnum;
  isVerified?: boolean;
  socialMediaId?: string;
  socialMediaType?: SocialMediaType;
  favProducts?: ObjectID[];
  fcmToken?: string;
  imageURL?: string;
  location?: Point;
}
export const buildClientParams = async (
  obj: clientType = {},
): Promise<Client> => {
  return {
    email: obj.email || faker.internet.email(),
    mobile: obj.mobile || faker.phone.phoneNumber('+20100#######'),
    name: obj.name || faker.name.firstName(),
    password: obj.password || faker.internet.password(),
    role: obj.role || UserRoleEnum.CLIENT,
    isVerified: obj.isVerified ?? false,
    socialMediaId: obj.socialMediaId || faker.finance.iban(),
    socialMediaType:
      obj.socialMediaType ||
      faker.random.arrayElement(getValuesFromEnum(SocialMediaType)),
    favProducts: obj.favProducts || [(await productFactory())._id],
    fcmToken: obj.fcmToken || faker.random.word(),
    imageURL: obj.imageURL || faker.internet.url(),
    location:
      obj.location === undefined
        ? {
            type: SpatialType.Point,
            coordinates: [
              +faker.address.longitude(),
              +faker.address.latitude(),
            ],
          }
        : obj.location,
  };
};

export const clientsFactory = async (
  count = 10,
  obj: clientType = {},
): Promise<Client[]> => {
  const clients: Client[] = [];
  for (let i = 0; i < count; i++) {
    clients.push(await buildClientParams(obj));
  }
  return (await ClientRepo()).addMany(clients);
};

export const clientFactory = async (obj: clientType = {}): Promise<Client> => {
  const params = await buildClientParams(obj);
  params.password = await hashPass(params.password);
  const client = await (await ClientRepo()).add(params);
  client.token = generateAuthToken(client._id);
  return client;
};

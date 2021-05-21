import * as faker from 'faker';
import { hashPass } from 'src/_common/utils/bcryptHelper';
import { generateAuthToken } from '../_common/utils/token-utils';
import { Driver } from './models/driver.schema';
import { DriverRepo } from '../../test/driver/driver-test-repo';
import { UserRoleEnum } from '../_common/app.enum';
import { Point } from 'src/_common/spatial-schemas/point.schema';
import { SpatialType } from '../_common/spatial-schemas/spatial.enum';

interface driverType {
  name?: string;
  mobile?: string;
  password?: string;
  notionalId?: string;
  isActive?: boolean;
  isVerified?: boolean;
  isAvailable?: boolean;
  rating?: number;
  location?: Point;
  role?: string;
  imageURL?: string;
  nationalIDImgBack?: string;
  nationalIDImgFront?: string;
  fcmToken?: string;
  nationalId?: string;
}

export const buildDriverParams = (obj: driverType = {}): Driver => {
  return {
    mobile: obj.mobile ?? faker.phone.phoneNumber('+2010########'),
    name: obj.name ?? faker.name.findName(),
    password: obj.password ?? faker.internet.password(),
    notionalId: obj.nationalId ?? faker.finance.iban(),
    isActive: obj.isActive ?? true,
    isVerified: obj.isVerified ?? true,
    isAvailable: obj.isAvailable ?? true,
    rating: obj.rating ?? faker.datatype.number(5),
    location: obj.location ?? {
      type: SpatialType.Point,
      coordinates: [
        parseFloat(faker.address.longitude()),
        parseFloat(faker.address.latitude()),
      ],
    },
    role: obj.role ?? UserRoleEnum.DRIVER,
    fcmToken: obj.fcmToken ?? faker.random.word(),
    imageURL: obj.imageURL ?? faker.internet.url(),
    nationalIDImgFront: obj.nationalIDImgFront ?? faker.internet.url(),
    nationalIDImgBack: obj.nationalIDImgBack ?? faker.internet.url(),
  };
};

export const driversFactory = async (
  count = 10,
  obj: driverType = {},
): Promise<Driver[]> => {
  const drivers: Driver[] = [];
  for (let i = 0; i < count; i++) {
    drivers.push(buildDriverParams(obj));
  }
  return (await DriverRepo()).addMany(drivers);
};

export const driverFactory = async (obj: driverType = {}): Promise<Driver> => {
  const params = buildDriverParams(obj);
  params.password = await hashPass(params.password);
  const driver = await (await DriverRepo()).add(params);
  driver.token = generateAuthToken(driver._id);
  return driver;
};

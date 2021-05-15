import * as faker from 'faker';
import { hashPass } from 'src/_common/utils/bcryptHelper';
import { generateAuthToken } from '../_common/utils/token-utils';
import { Driver } from './models/driver.schema';
import { DriverRepo } from '../../test/driver/driver-test-repo';
import { UserRoleEnum } from '../_common/app.enum';

export const buildDriverParams = (obj = <any>{}): Driver => {
  return {
    mobile: obj.mobile ?? faker.phone.phoneNumber('+2010########'),
    name: obj.name ?? faker.name.findName(),
    password: obj.password ?? faker.internet.password(),
    notionalId: obj.nationalId ?? faker.finance.iban(),
    isActive: obj.isActive ?? false,
    isVerified: obj.isVerified ?? false,
    isAvailable: obj.isAvailable ?? false,
    rating: obj.rating ?? faker.datatype.number(5),
    location: obj.location ?? {
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

export const usersFactory = async (
  count = 10,
  obj = <any>{},
): Promise<Driver[]> => {
  const faqs: Driver[] = [];
  for (let i = 0; i < count; i++) {
    faqs.push(buildDriverParams(obj));
  }
  return (await DriverRepo()).addMany(faqs);
};

export const DriverFactory = async (obj = <any>{}): Promise<Driver> => {
  const params = buildDriverParams(obj);
  params.password = await hashPass(params.password);
  const driver = await (await DriverRepo()).add(params);
  driver.token = generateAuthToken(driver._id);
  return driver;
};

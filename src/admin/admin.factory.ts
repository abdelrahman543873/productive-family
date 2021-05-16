import { AdminRepo } from './../../test/user/user-test-repo';
import * as faker from 'faker';
import { UserRoleEnum } from 'src/_common/app.enum';
import { Admin } from './models/admin.schema';
import { hashPass } from 'src/_common/utils/bcryptHelper';
import { generateAuthToken } from '../_common/utils/token-utils';

export const buildAdminParams = (obj = <any>{}): Admin => {
  return {
    email: obj.email || faker.internet.email(),
    mobile: obj.phone || faker.phone.phoneNumber('+20100#######'),
    name: obj.name || faker.name.findName(),
    password: obj.password || faker.internet.password(),
    role: obj.role || UserRoleEnum.ADMIN,
  };
};

export const adminsFactory = async (
  count = 10,
  obj = <any>{},
): Promise<Admin[]> => {
  const faqs: Admin[] = [];
  for (let i = 0; i < count; i++) {
    faqs.push(buildAdminParams(obj));
  }
  return (await AdminRepo()).addMany(faqs);
};

export const adminFactory = async (obj = <any>{}): Promise<Admin> => {
  const params = buildAdminParams(obj);
  params.password = await hashPass(params.password);
  const user = await (await AdminRepo()).add(params);
  user.token = generateAuthToken(user._id);
  return user;
};

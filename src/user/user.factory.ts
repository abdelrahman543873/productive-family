import * as faker from 'faker';
import { UserRoleEnum } from 'src/_common/user.enum';
import { getValuesFromEnum } from 'src/_common/utils/column-enum';
import { User } from './models/user.schema';
import { UserRepo } from '../../test/user/user-test-repo';
import { hashPass } from 'src/_common/utils/bcryptHelper';
import { generateAuthToken } from '../_common/utils/token-utils';

export const buildUserParams = (obj = <any>{}): User => {
  return {
    email: obj.email || faker.internet.email(),
    mobile: obj.phone || faker.phone.phoneNumber(),
    name: obj.name || faker.name.findName(),
    password: obj.password || faker.internet.password(),
    role:
      obj.role || faker.random.arrayElement(getValuesFromEnum(UserRoleEnum)),
  };
};

export const usersFactory = async (
  count = 10,
  obj = <any>{},
): Promise<User[]> => {
  const faqs: User[] = [];
  for (let i = 0; i < count; i++) {
    faqs.push(buildUserParams(obj));
  }
  return (await UserRepo()).addMany(faqs);
};

export const userFactory = async (obj = <any>{}): Promise<User> => {
  const params = buildUserParams(obj);
  params.password = await hashPass(params.password);
  const user = await (await UserRepo()).add(params);
  user.token = generateAuthToken(user._id);
  return user;
};

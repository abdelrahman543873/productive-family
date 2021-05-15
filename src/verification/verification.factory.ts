import { adminFactory } from 'src/admin/admin.factory';
import * as faker from 'faker';
import { verificationRepo } from '../../test/verification/verification-test-repo';
import { Verification } from './models/verification.schema';
import { env } from '../_common/utils/env';

export const buildVerificationParams = async (
  obj: Record<any, any> = {},
): Promise<Verification> => {
  return {
    user: obj.user || (await adminFactory())._id,
    code: obj.code || `${faker.datatype.number()}`,
    expirationDate:
      obj.expirationDate ||
      new Date(Date.now() + Number(env.OTP_EXPIRY_TIME) * 1000 * 60),
    mobile: obj.mobile || faker.phone.phoneNumber('+20165#######'),
    email: obj.email || faker.internet.email(),
  };
};

export const verificationsFactory = async (
  count = 10,
  obj = {},
): Promise<Verification[]> => {
  const verifications: Verification[] = [];
  for (let i = 0; i < count; i++) {
    verifications.push(await buildVerificationParams(obj));
  }
  return (await verificationRepo()).addMany(verifications);
};

export const verificationFactory = async (obj = {}): Promise<Verification> => {
  const params = await buildVerificationParams(obj);
  return await (await verificationRepo()).add(params);
};

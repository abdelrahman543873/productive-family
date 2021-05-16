import { adminFactory } from 'src/admin/admin.factory';
import * as faker from 'faker';
import { verificationRepo } from '../../test/verification/verification-test-repo';
import { Verification } from './models/verification.schema';
import { env } from '../_common/utils/env';
import { ObjectID } from 'mongodb';

interface verificationType {
  user?: ObjectID;
  code?: string;
  expirationDate?: Date;
  mobile?: string;
  email?: string;
}
export const buildVerificationParams = async (
  obj: verificationType = {},
): Promise<Verification> => {
  const admin = await adminFactory();
  return {
    user: obj.user || admin._id,
    code: obj.code || `${faker.datatype.number()}`,
    expirationDate:
      obj.expirationDate ||
      new Date(Date.now() + Number(env.OTP_EXPIRY_TIME) * 1000 * 60),
    mobile: obj.mobile || admin.mobile,
    email: obj.email || admin.email,
  };
};

export const verificationsFactory = async (
  count = 10,
  obj: verificationType = {},
): Promise<Verification[]> => {
  const verifications: Verification[] = [];
  for (let i = 0; i < count; i++) {
    verifications.push(await buildVerificationParams(obj));
  }
  return (await verificationRepo()).addMany(verifications);
};

export const verificationFactory = async (
  obj: verificationType = {},
): Promise<Verification> => {
  const params = await buildVerificationParams(obj);
  return await (await verificationRepo()).add(params);
};

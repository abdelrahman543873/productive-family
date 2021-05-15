import { adminFactory } from 'src/admin/admin.factory';
import faker from 'faker';
import dotenv from 'dotenv';
import { verificationRepo } from '../../test/verification/verification-test-repo';
import { Verification } from './models/verification.schema';

dotenv.config();
export const buildVerificationParams = async (
  obj: Record<any, any> = {},
): Promise<Verification> => {
  return {
    user: obj.user || (await adminFactory())._id,
    code: obj.code || faker.datatype.number(),
    expirationDate:
      obj.expirationDate ||
      Date.now() + Number(process.env.OTP_EXPIRY_TIME) * 1000 * 60,
    phone: obj.phone || faker.phone.phoneNumber('+20165#######'),
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

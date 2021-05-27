import { verificationFactory } from '../../src/verification/verification.factory';
import { rollbackDbForVerification } from './rollback-for-verification';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { VERIFY_OTP } from '../endpoints/verification';
import { driverFactory } from '../../src/driver/driver.factory';
describe('verify verification code suite case', () => {
  it('should verify verification code for admin', async () => {
    const verification = await verificationFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: VERIFY_OTP,
      variables: { code: verification.code, email: verification.email },
    });
    expect(res.body.data.email).toBe(verification.email);
  });

  it('should verify verification code for driver', async () => {
    const driver = await driverFactory();
    const verification = await verificationFactory({ user: driver._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: VERIFY_OTP,
      variables: { code: verification.code, mobile: verification.mobile },
    });
    expect(res.body.data.mobile).toBe(driver.mobile);
  });

  it('should throw error if code is expired', async () => {
    const verification = await verificationFactory({
      expirationDate: new Date(16211527259),
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: VERIFY_OTP,
      variables: { code: verification.code, mobile: verification.mobile },
    });
    expect(res.body.statusCode).toBe(609);
  });
});

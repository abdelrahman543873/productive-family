import { rollbackDbForVerification } from './rollback-for-verification';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { SEND_OTP, VERIFY_OTP } from '../endpoints/verification';
import { adminFactory } from '../../src/admin/admin.factory';
describe('verify verification code suite case', () => {
  it('should send verification code for admin', async () => {
    const admin = await adminFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: SEND_OTP,
      variables: { mobile: admin.mobile },
    });
    expect(res.body.success).toBe(true);
  });

  it('should send and verify otp', async () => {
    const admin = await adminFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: SEND_OTP,
      variables: { mobile: admin.mobile },
    });
    expect(res.body.success).toBe(true);
    const res1 = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: VERIFY_OTP,
      variables: { code: '12345', mobile: admin.mobile },
    });
    expect(res1.body.data.mobile).toBe(admin.mobile);
  });
});

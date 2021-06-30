import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { SEND_OTP, VERIFY_OTP } from '../endpoints/verification';
import { adminFactory } from '../../src/admin/admin.factory';
import { buildClientParams } from 'src/client/client.factory';
import { CLIENT_REGISTER } from 'test/endpoints/client';
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

  it('should register and send otp and verify otp', async () => {
    const params = await buildClientParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CLIENT_REGISTER,
      variables: {
        mobile: params.mobile,
        password: params.password,
        name: params.name,
      },
    });
    expect(res.body.data.name).toBe(params.name);
    const res1 = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: SEND_OTP,
      variables: { mobile: params.mobile },
    });
    expect(res1.body.success).toBe(true);
    const res2 = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: VERIFY_OTP,
      variables: { code: '12345', mobile: params.mobile },
    });
    expect(res2.body.data.mobile).toBe(params.mobile);
  });
});

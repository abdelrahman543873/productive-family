import { verificationFactory } from '../../src/verification/verification.factory';
import { rollbackDbForVerification } from './rollback-for-verification';
import { verificationRepo } from './verification-test-repo';
describe('verify verification code suite case', () => {
  it('should verify verification code', async () => {
    const verification = await verificationFactory();
    const validatedVerification = await (await verificationRepo()).verifyOTP({
      code: verification.code,
      mobile: verification.mobile,
      email: verification.email,
    });
    expect(validatedVerification.mobile).toBe(validatedVerification.mobile);
    expect(validatedVerification.code).toBe(validatedVerification.code);
    expect(validatedVerification.email).toBe(validatedVerification.email);
  });
});

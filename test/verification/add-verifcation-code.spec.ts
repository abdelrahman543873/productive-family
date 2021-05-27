import { rollbackDbForVerification } from './rollback-for-verification';
import { verificationRepo } from './verification-test-repo';
import { buildVerificationParams } from '../../src/verification/verification.factory';
describe('add verification suite case', () => {
  it('add verification code', async () => {
    const params = await buildVerificationParams();
    const verification = await (await verificationRepo()).addVerificationCode(
      params,
    );
    expect(verification.code).toBe(params.code);
    expect(verification.mobile).toBe(params.mobile);
  });
});

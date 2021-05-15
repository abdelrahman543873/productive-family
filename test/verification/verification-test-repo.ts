import { moduleRef } from 'test/before-test-run';
import { VerificationRepository } from '../../src/verification/verification.repository';

export const verificationRepo = async (): Promise<VerificationRepository> =>
  (await moduleRef()).get<VerificationRepository>(VerificationRepository);

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { VerificationInput } from './inputs/verification.inputs';
import { VerifyOtpInput } from './inputs/verify-otp.input';
import {
  Verification,
  VerificationDocument,
} from './models/verification.schema';

@Injectable()
export class VerificationRepository extends BaseRepository<Verification> {
  constructor(
    @InjectModel(Verification.name)
    private verificationSchema: Model<VerificationDocument>,
  ) {
    super(verificationSchema);
  }

  async addVerificationCode(
    verification: VerificationInput,
  ): Promise<Verification> {
    return await this.verificationSchema.create(verification);
  }

  async verifyOTP(verification: VerifyOtpInput): Promise<Verification> {
    return await this.verificationSchema.findOne({
      ...(verification.user && { user: verification.user }),
      ...(verification.email && { email: verification.email }),
      ...(verification.mobile && { mobile: verification.mobile }),
      code: verification.code,
    });
  }

  async resendCodeRepository(user: string): Promise<Verification> {
    return await this.verificationSchema.findOne({
      user,
      expirationDate: { $gte: new Date() },
    });
  }
}

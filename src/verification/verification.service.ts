import { Inject, Injectable } from '@nestjs/common';
import { VerifyOtpInput } from './inputs/verify-otp.input';
import { VerificationRepository } from './verification.repository';
import { BaseHttpException } from '../_common/exceptions/base-http-exception';
import { REQUEST } from '@nestjs/core';
import { HelperService } from '../_common/helper/helper.service';
import { Admin } from '../admin/models/admin.schema';
import { Driver } from '../driver/models/driver.schema';
import { generateAuthToken } from '../_common/utils/token-utils';
import { RequestContext } from 'src/_common/request.interface';

@Injectable()
export class VerificationService {
  constructor(
    @Inject(REQUEST) private readonly request: RequestContext,
    private readonly verificationRepo: VerificationRepository,
    private readonly helperService: HelperService,
  ) {}

  async verifyOtp(input: VerifyOtpInput): Promise<Admin | Driver> {
    const verification = await this.verificationRepo.verifyOTP(input);
    if (!verification) throw new BaseHttpException(this.request.lang, 608);
    if (verification.expirationDate < new Date())
      throw new BaseHttpException(this.request.lang, 609);
    const user = await this.helperService.getExistingUser({
      _id: verification.user,
    });
    user.token = generateAuthToken(user._id);
    return user;
  }
}

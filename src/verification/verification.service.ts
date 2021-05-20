import { Provider } from './../provider/models/provider.schema';
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
import { SendOtpInput } from './inputs/send-otp.input';
import { createVerificationCode } from 'src/_common/utils/sms-token';
import { sendMessage } from 'src/_common/utils/twilio';
import { Client } from 'src/client/models/client.schema';

@Injectable()
export class VerificationService {
  constructor(
    @Inject(REQUEST) private readonly request: RequestContext,
    private readonly verificationRepo: VerificationRepository,
    private readonly helperService: HelperService,
  ) {}

  async verifyOtp(
    input: VerifyOtpInput,
  ): Promise<Admin | Driver | Client | Provider> {
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

  async sendOtp(input: SendOtpInput): Promise<null> {
    const user = (await this.helperService.getExistingUser({
      _id: input.user,
      email: input.email,
      mobile: input.mobile,
    })) as Driver;
    if (!user) throw new BaseHttpException(this.request.lang, 610);
    if (user.isActive) throw new BaseHttpException(this.request.lang, 611);
    const verificationCode = await this.verificationRepo.addVerificationCode({
      user: user._id,
      mobile: user.mobile,
      ...createVerificationCode(),
    });
    await sendMessage({
      to: user.mobile,
      body: verificationCode.code,
    });
    return null;
  }
}

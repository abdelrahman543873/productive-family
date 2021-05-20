import { Inject, Injectable } from '@nestjs/common';
import { DriverRegisterInput } from './inputs/driver-register.input';
import { DriverRepository } from './driver.repository';
import { Driver } from './models/driver.schema';
import { generateAuthToken } from '../_common/utils/token-utils';
import { File } from 'fastify-multer/lib/interfaces';
import { createVerificationCode } from 'src/_common/utils/sms-token';
import { VerificationRepository } from '../verification/verification.repository';
import { sendMessage } from 'src/_common/utils/twilio';
import { HelperService } from 'src/_common/helper/helper.service';
import { BaseHttpException } from '../_common/exceptions/base-http-exception';
import { DriverUpdateProfileInput } from './inputs/driver-update-profile.input';
import { bcryptCheckPass } from 'src/_common/utils/bcryptHelper';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/_common/request.interface';

@Injectable()
export class DriverService {
  constructor(
    private readonly driverRepo: DriverRepository,
    private readonly verificationRepo: VerificationRepository,
    private readonly helperService: HelperService,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async register(
    input: DriverRegisterInput,
    files: Array<File>,
  ): Promise<Driver> {
    const alreadyRegisteredMobile = await this.helperService.getExistingUser({
      mobile: input.mobile,
    });
    if (alreadyRegisteredMobile)
      throw new BaseHttpException(this.request.lang, 602);
    const driver = await this.driverRepo.register(input, files);
    driver.token = generateAuthToken(driver._id);
    delete driver.password;
    const verificationCode = await this.verificationRepo.addVerificationCode({
      user: driver._id,
      mobile: driver.mobile,
      ...createVerificationCode(),
    });
    await sendMessage({
      to: driver.mobile,
      body: verificationCode.code,
    });
    return driver;
  }

  async updateProfile(
    input: DriverUpdateProfileInput,
    files: Array<File>,
  ): Promise<Driver> {
    const passwordValidation = input.password
      ? await bcryptCheckPass(input.password, this.request.currentUser.password)
      : true;
    if (!passwordValidation)
      throw new BaseHttpException(this.request.lang, 607);
    return await this.driverRepo.updateProfile(
      this.request.currentUser._id,
      input,
      files,
    );
  }

  async toggleActivity(): Promise<boolean> {
    const driver = await this.driverRepo.toggleActivity(
      this.request.currentUser._id,
      !this.request.currentUser.isActive,
    );
    return driver.isActive;
  }

  async home(): Promise<Record<any, any>> {
    return await this.driverRepo.home(this.request.currentUser._id);
  }
}

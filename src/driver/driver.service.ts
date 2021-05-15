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
import { REQUEST } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { LangEnum } from '../_common/app.enum';

@Injectable()
export class DriverService {
  constructor(
    @Inject(REQUEST) private readonly request: FastifyRequest,
    private readonly driverRepo: DriverRepository,
    private readonly verificationRepo: VerificationRepository,
    private readonly helperService: HelperService,
  ) {}
  async register(
    input: DriverRegisterInput,
    files: Array<File>,
  ): Promise<Driver> {
    const alreadyRegisteredUser = await this.helperService.getExistingUser({
      mobile: input.mobile,
    });
    if (alreadyRegisteredUser)
      throw new BaseHttpException(
        this.request.headers['accept-language'] ?? LangEnum.EN,
        602,
      );
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
}

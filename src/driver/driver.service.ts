import { Injectable } from '@nestjs/common';
import { DriverRegisterInput } from './inputs/driver-register.input';
import { DriverRepository } from './driver.repository';
import { Driver } from './models/driver.schema';
import { generateAuthToken } from '../_common/utils/token-utils';
import { File } from 'fastify-multer/lib/interfaces';
import { createVerificationCode } from 'src/_common/utils/sms-token';
import { VerificationRepository } from '../verification/verification.repository';
import { sendMessage } from 'src/_common/utils/twilio';

@Injectable()
export class DriverService {
  constructor(
    private readonly driverRepo: DriverRepository,
    private readonly verificationRepo: VerificationRepository,
  ) {}
  async register(
    input: DriverRegisterInput,
    files: Array<File>,
  ): Promise<Driver> {
    const driver = await this.driverRepo.register(input, files);
    driver.token = generateAuthToken(driver._id);
    delete driver.password;
    const verificationCode = await this.verificationRepo.addVerificationCode({
      user: driver._id,
      ...createVerificationCode(),
    });
    await sendMessage({
      to: driver.mobile,
      body: verificationCode.code,
    });
    return driver;
  }
}

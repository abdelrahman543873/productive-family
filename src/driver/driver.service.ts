import { Injectable } from '@nestjs/common';
import { DriverRegisterInput } from './inputs/driver-register.input';
import { DriverRepository } from './driver.repository';
import { Driver } from './models/driver.schema';
import { generateAuthToken } from '../_common/utils/token-utils';
import { File } from 'fastify-multer/lib/interfaces';

@Injectable()
export class DriverService {
  constructor(private readonly driverRepo: DriverRepository) {}
  async register(
    input: DriverRegisterInput,
    files: Array<File>,
  ): Promise<Driver> {
    const driver = await this.driverRepo.register(input, files);
    driver.token = generateAuthToken(driver._id);
    delete driver.password;
    return driver;
  }
}
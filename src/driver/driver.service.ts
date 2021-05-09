import { Injectable } from '@nestjs/common';
import { DriverRegisterInput } from './inputs/driver-register.input';
import { DriverRepository } from './driver.repository';
import { Driver } from './models/driver.schema';
import { generateAuthToken } from '../shared/utils/token-utils';

@Injectable()
export class DriverService {
  constructor(private readonly driverRepo: DriverRepository) {}
  async register(input: DriverRegisterInput): Promise<Driver> {
    const driver = await this.driverRepo.register(input);
    driver.token = generateAuthToken(driver._id);
    return driver;
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DriverService } from './driver.service';
import { DriverRegisterInput } from './inputs/driver-register.input';
import { Driver } from './models/driver.schema';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiTags('driver')
  @ApiResponse({ status: 201, type: Driver })
  @Post('register')
  async register(@Body() input: DriverRegisterInput): Promise<Driver> {
    return await this.driverService.register(input);
  }
}

import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DriverService } from './driver.service';
import { DriverRegisterInput } from './inputs/driver-register.input';
import { Driver } from './models/driver.schema';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiTags('driver')
  @ApiResponse({ status: 201, type: Driver })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imageURL', maxCount: 1 },
      { name: 'nationalIDImgBack', maxCount: 1 },
      { name: 'nationalIDImgFront', maxCount: 1 },
    ]),
  )
  @Post('register')
  async register(
    @Body() input: DriverRegisterInput,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Driver> {
    return await this.driverService.register(input, files);
  }
}

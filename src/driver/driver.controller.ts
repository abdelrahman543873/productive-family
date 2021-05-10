import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@webundsoehne/nest-fastify-file-upload';
import { DriverService } from './driver.service';
import { DriverRegisterInput } from './inputs/driver-register.input';
import { Driver } from './models/driver.schema';
import { driverRegisterSchema } from './swagger/driver-register.swagger';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiTags('driver')
  @ApiResponse({ status: 201, type: Driver })
  @ApiConsumes('multipart/form-data')
  @ApiBody(driverRegisterSchema)
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

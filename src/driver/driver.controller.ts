import {
  Body,
  Controller,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@webundsoehne/nest-fastify-file-upload';
import { File } from 'fastify-multer/lib/interfaces';
import { DriverService } from './driver.service';
import { DriverRegisterInput } from './inputs/driver-register.input';
import { Driver } from './models/driver.schema';
import { driverRegisterSchema } from './swagger/driver-register.swagger';
import { driverUpdateProfileSchema } from './swagger/driver-update-profile';
import { DriverUpdateProfileInput } from './inputs/driver-update-profile.input';
import { HasRoles } from 'src/_common/guards/auth.metadata';
import { UserRoleEnum } from 'src/_common/app.enum';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import { RoleGuard } from 'src/_common/guards/roles.guard';
import { JoiValidationPipe } from '../_common/pipes/joi.pipe';
import { DriverUpdateProfileJoi } from './joi/driver-update-profile.joi';

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
    @UploadedFiles() files: Array<File>,
  ): Promise<Driver> {
    return await this.driverService.register(input, files);
  }

  @ApiBearerAuth()
  @ApiTags('driver')
  @ApiResponse({ status: 201, type: Driver })
  @ApiConsumes('multipart/form-data')
  @ApiBody(driverUpdateProfileSchema)
  @HasRoles(UserRoleEnum.DRIVER)
  @UseGuards(AuthGuard, RoleGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imageURL', maxCount: 1 },
      { name: 'nationalIDImgBack', maxCount: 1 },
      { name: 'nationalIDImgFront', maxCount: 1 },
    ]),
  )
  @UsePipes(new JoiValidationPipe(DriverUpdateProfileJoi))
  @Put('updateProfile')
  async updateProfile(
    @Body() input: DriverUpdateProfileInput,
    @UploadedFiles() files: Array<File>,
  ): Promise<Driver> {
    return await this.driverService.updateProfile(input, files);
  }
}

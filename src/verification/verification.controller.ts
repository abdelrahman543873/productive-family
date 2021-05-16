import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { VerifyOtpInput } from './inputs/verify-otp.input';
import { VerificationService } from './verification.service';
import { Driver } from '../driver/models/driver.schema';
import { Admin } from 'src/admin/models/admin.schema';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '../_common/pipes/joi.pipe';
import { VerifyOtpJoi } from './joi/verify-otp.joi';

@Controller('verify')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @ApiResponse({ status: 201, type: Driver || Admin })
  @ApiTags('verification')
  @UsePipes(new JoiValidationPipe(VerifyOtpJoi))
  @Post('otp')
  async verifyOtp(@Body() input: VerifyOtpInput): Promise<Admin | Driver> {
    return await this.verificationService.verifyOtp(input);
  }
}

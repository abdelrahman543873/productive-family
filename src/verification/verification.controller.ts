import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { VerifyOtpInput } from './inputs/verify-otp.input';
import { VerificationService } from './verification.service';
import { Driver } from '../driver/models/driver.schema';
import { Admin } from 'src/admin/models/admin.schema';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '../_common/pipes/joi.pipe';
import { VerifyOtpJoi } from './joi/verify-otp.joi';
import { SendOtpInput } from './inputs/send-otp.input';
import { SendOtpJoi } from './joi/send-otp.joi';
import { sendOtpSchema } from './swagger/send-otp.swagger';
import { Client } from '../client/models/client.schema';
import { Provider } from '../provider/models/provider.schema';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @ApiResponse({ status: 201, type: Driver })
  @ApiTags('verification')
  @UsePipes(new JoiValidationPipe(VerifyOtpJoi))
  @Post('otp')
  async verifyOtp(
    @Body() input: VerifyOtpInput,
  ): Promise<Admin | Driver | Client | Provider> {
    return await this.verificationService.verifyOtp(input);
  }

  @ApiResponse({ status: 201, schema: sendOtpSchema })
  @ApiTags('verification')
  @UsePipes(new JoiValidationPipe(SendOtpJoi))
  @Post('sendOtp')
  async sendOtp(@Body() input: SendOtpInput): Promise<null> {
    return await this.verificationService.sendOtp(input);
  }
}

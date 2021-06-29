import { LoginJoi } from './joi/login.joi';
import { Body, Controller, Post, Provider, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/admin/models/admin.schema';
import { Client } from 'src/client/models/client.schema';
import { Driver } from 'src/driver/models/driver.schema';
import { AuthService } from './auth.service';
import { LoginInput } from './inputs/login.input';
import { JoiValidationPipe } from '../pipes/joi.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('auth')
  @UsePipes(new JoiValidationPipe(LoginJoi))
  @Post('login')
  async login(
    @Body() input: LoginInput,
  ): Promise<Driver | Client | Provider | Admin> {
    return await this.authService.login(input);
  }
}

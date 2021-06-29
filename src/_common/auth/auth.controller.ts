import { LoginJoi } from './joi/login.joi';
import {
  Body,
  Controller,
  Get,
  Post,
  Provider,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/admin/models/admin.schema';
import { Client } from 'src/client/models/client.schema';
import { Driver } from 'src/driver/models/driver.schema';
import { AuthService } from './auth.service';
import { LoginInput } from './inputs/login.input';
import { JoiValidationPipe } from '../pipes/joi.pipe';
import { AuthGuard } from '../guards/auth.guard';

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

  @ApiTags('auth')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('info')
  async getInfo(): Promise<Record<any, any>> {
    return await this.authService.getInfo();
  }
}

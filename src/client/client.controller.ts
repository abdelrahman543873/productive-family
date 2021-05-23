import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientRegisterInput } from './inputs/client-register.input';
import { SocialLoginInput } from './inputs/social-login.input';
import { SocialRegisterInput } from './inputs/social-register.input';
import { Client } from './models/client.schema';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiTags('client')
  @Post('register')
  async register(@Body() input: ClientRegisterInput): Promise<Client> {
    return await this.clientService.register(input);
  }

  @ApiTags('client')
  @Post('socialRegister')
  async socialRegister(@Body() input: SocialRegisterInput): Promise<Client> {
    return await this.clientService.socialRegister(input);
  }

  @ApiTags('client')
  @Post('socialLogin')
  async socialSocialLogin(@Body() input: SocialLoginInput): Promise<Client> {
    return await this.clientService.socialLogin(input);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientRegisterInput } from './inputs/client-register.input';
import { Client } from './models/client.schema';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiTags('client')
  @Post('register')
  async register(@Body() input: ClientRegisterInput): Promise<Client> {
    return await this.clientService.register(input);
  }
}

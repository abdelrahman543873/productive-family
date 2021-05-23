import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { VerificationRepository } from 'src/verification/verification.repository';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { HelperService } from 'src/_common/helper/helper.service';
import { RequestContext } from 'src/_common/request.interface';
import { createVerificationCode } from 'src/_common/utils/sms-token';
import { generateAuthToken } from 'src/_common/utils/token-utils';
import { sendMessage } from 'src/_common/utils/twilio';
import { ClientRepository } from './client.repository';
import { ClientRegisterInput } from './inputs/client-register.input';
import { Client } from './models/client.schema';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepo: ClientRepository,
    private readonly helperService: HelperService,
    private readonly verificationRepo: VerificationRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async register(input: ClientRegisterInput): Promise<Client> {
    const alreadyRegisteredMobile = await this.helperService.getExistingUser({
      mobile: input.mobile,
    });
    if (alreadyRegisteredMobile)
      throw new BaseHttpException(this.request.lang, 602);
    const client = await this.clientRepo.register(input);
    client.token = generateAuthToken(client._id);
    const verificationCode = await this.verificationRepo.addVerificationCode({
      user: client._id,
      mobile: client.mobile,
      ...createVerificationCode(),
    });
    await sendMessage({
      to: client.mobile,
      body: verificationCode.code,
    });
    return client;
  }
}

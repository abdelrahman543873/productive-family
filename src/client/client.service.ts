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
import { SocialRegisterInput } from './inputs/social-register.input';
import { SocialLoginInput } from './inputs/social-login.input';
import { ClientUpdateProfileInput } from './inputs/client-update-profile';
import { bcryptCheckPass } from 'src/_common/utils/bcryptHelper';
import { File } from 'fastify-multer/lib/interfaces';
import { ToggleFavProductInput } from './inputs/toggle-fav-product.input';
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

  async socialRegister(input: SocialRegisterInput): Promise<Client> {
    return await this.clientRepo.socialRegister(input);
  }

  async socialLogin(input: SocialLoginInput): Promise<Client> {
    const client = await this.clientRepo.socialLogin(input);
    client.token = generateAuthToken(client._id);
    return client;
  }

  async updateProfile(
    input: ClientUpdateProfileInput,
    file?: File,
  ): Promise<Client> {
    const passwordValidation = input.password
      ? await bcryptCheckPass(input.password, this.request.currentUser.password)
      : true;
    if (!passwordValidation)
      throw new BaseHttpException(this.request.lang, 607);
    return await this.clientRepo.updateProfile(
      this.request.currentUser._id,
      input,
      file,
    );
  }

  async toggleFavoriteProduct(input: ToggleFavProductInput): Promise<Client> {
    if (this.request.currentUser.favProducts.includes(input.product))
      return await this.clientRepo.removeFavoriteProduct(
        this.request.currentUser._id,
        input.product,
      );
    return await this.clientRepo.addFavoriteProduct(
      this.request.currentUser._id,
      input.product,
    );
  }
}

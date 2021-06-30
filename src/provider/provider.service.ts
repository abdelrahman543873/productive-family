import { createVerificationCode } from './../_common/utils/sms-token';
import { HelperService } from './../_common/helper/helper.service';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/_common/request.interface';
import { ProviderRepository } from './provider.repository';
import { Pagination } from '../_common/utils/pagination.input';
import { AggregatePaginateResult } from 'mongoose';
import { Provider } from './models/provider.schema';
import { ProviderRegisterInput } from './inputs/provider-register.input';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { generateAuthToken } from 'src/_common/utils/token-utils';
import { VerificationRepository } from 'src/verification/verification.repository';
import { sendMessage } from 'src/_common/utils/twilio';
import { File } from 'fastify-multer/lib/interfaces';
@Injectable()
export class ProviderService {
  constructor(
    private readonly helperService: HelperService,
    private readonly providerRepo: ProviderRepository,
    private readonly verificationRepo: VerificationRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async register(
    input: ProviderRegisterInput,
    files?: Array<File>,
  ): Promise<Provider> {
    const coordinates = [this.request.long, this.request.lat];
    if (!coordinates[0] || !coordinates[1])
      throw new BaseHttpException(this.request.lang, 612);
    const alreadyRegisteredMobile = await this.helperService.getExistingUser({
      mobile: input.mobile,
      email: input.email,
    });
    if (alreadyRegisteredMobile)
      throw new BaseHttpException(this.request.lang, 602);
    const provider = await this.providerRepo.register(
      input,
      coordinates,
      files,
    );
    provider.token = generateAuthToken(provider._id);
    const verificationCode = await this.verificationRepo.addVerificationCode({
      user: provider._id,
      mobile: provider.mobile,
      ...createVerificationCode(),
    });
    await sendMessage({
      to: provider.mobile,
      body: verificationCode.code,
    });
    delete provider.password;
    return provider;
  }

  async getNewProviders(
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<Provider>> {
    return await this.providerRepo.getNewProviders(
      this.request.currentUser.location.coordinates,
      pagination,
    );
  }
}

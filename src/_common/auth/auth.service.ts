import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HelperService } from '../helper/helper.service';
import { LoginInput } from './inputs/login.input';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { RequestContext } from '../request.interface';
import { REQUEST } from '@nestjs/core';
import { Driver } from '../../driver/models/driver.schema';
import { Client } from '../../client/models/client.schema';
import { Provider } from '../../provider/models/provider.schema';
import { Admin } from '../../admin/models/admin.schema';
import { bcryptCheckPass } from '../utils/bcryptHelper';

@Injectable()
export class AuthService {
  constructor(
    private readonly helperService: HelperService,
    private readonly jwtService: JwtService,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}
  async login(input: LoginInput): Promise<Driver | Client | Provider | Admin> {
    const socialLogin = input.socialMediaId
      ? await this.helperService.getExistingUser({
          socialMediaId: input.socialMediaId,
        })
      : null;
    if (socialLogin) {
      socialLogin.token = this.jwtService.sign({ _id: socialLogin._id });
      return socialLogin;
    }
    const user = await this.helperService.getExistingUser({
      mobile: input.mobile,
      password: true,
    });
    if (!user) throw new BaseHttpException(this.request.lang, 610);
    const passwordValidation = await bcryptCheckPass(
      input.password,
      user.password,
    );
    if (!passwordValidation)
      throw new BaseHttpException(this.request.lang, 603);
    user.token = this.jwtService.sign({ _id: user._id });
    delete user.password;
    return user;
  }
}

import { IsString } from 'class-validator';

export class SocialLoginInput {
  @IsString()
  socialMediaId: string;
}

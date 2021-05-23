import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { SocialMediaType } from '../social-media.enum';

export class SocialRegisterInput {
  @IsString()
  name: string;

  @IsString()
  socialMediaId: string;

  @IsEnum(SocialMediaType)
  socialMediaType: SocialMediaType;

  @IsOptional()
  @IsPhoneNumber('EG')
  mobile?: string;
}

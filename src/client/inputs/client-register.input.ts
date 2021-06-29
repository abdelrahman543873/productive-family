import {
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { SocialMediaType } from '../social-media.enum';

export class ClientRegisterInput {
  @IsString()
  name: string;

  @IsOptional()
  @MinLength(8)
  @IsString()
  password?: string;

  @IsOptional()
  @IsPhoneNumber('EG')
  mobile?: string;

  @IsOptional()
  @IsString()
  socialMediaId?: string;

  @IsOptional()
  @IsEnum(SocialMediaType)
  socialMediaType?: SocialMediaType;
}

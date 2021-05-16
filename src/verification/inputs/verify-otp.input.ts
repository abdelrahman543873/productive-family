import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class VerifyOtpInput {
  @IsMongoId()
  @IsOptional()
  user?: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsPhoneNumber('EG')
  mobile?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

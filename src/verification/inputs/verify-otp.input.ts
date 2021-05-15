import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class VerifyOtpInput {
  @IsOptional()
  user?: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsPhoneNumber()
  mobile?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

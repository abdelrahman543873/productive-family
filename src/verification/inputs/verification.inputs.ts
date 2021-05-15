import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class VerificationInput {
  @IsOptional()
  user?: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsDate()
  expirationDate: Date;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

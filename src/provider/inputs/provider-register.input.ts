import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class ProviderRegisterInput {
  @IsString()
  name: string;

  @MinLength(8)
  @IsString()
  password: string;

  @IsPhoneNumber('EG')
  mobile: string;

  @IsEmail()
  email: string;
}

import {
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class ClientRegisterInput {
  @IsString()
  name: string;

  @MinLength(8)
  @IsString()
  password: string;

  @IsPhoneNumber('EG')
  mobile: string;
}

import {
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginInput {
  @IsPhoneNumber('EG')
  mobile: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  password: string;
}

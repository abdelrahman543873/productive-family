import { IsEmail, IsLowercase, IsPhoneNumber, IsString } from 'class-validator';

export class GetExistingUserInput {
  @IsString()
  _id?: string;

  @IsLowercase()
  @IsEmail()
  email?: string;

  @IsPhoneNumber()
  mobile: string;
}

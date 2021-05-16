import { ObjectID } from 'mongodb';
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
  user?: ObjectID;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsDate()
  expirationDate: Date;

  @IsOptional()
  @IsPhoneNumber('EG')
  mobile?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

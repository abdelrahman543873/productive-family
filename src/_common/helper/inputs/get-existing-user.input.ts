import { ObjectID } from 'mongodb';
import {
  IsBoolean,
  IsEmail,
  IsLowercase,
  IsMongoId,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class GetExistingUserInput {
  @IsOptional()
  @IsMongoId()
  @IsString()
  _id?: ObjectID;

  @IsOptional()
  @IsLowercase()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  socialMediaId?: string;

  @IsOptional()
  @IsPhoneNumber()
  mobile?: string;

  @IsOptional()
  @IsBoolean()
  password?: boolean;
}

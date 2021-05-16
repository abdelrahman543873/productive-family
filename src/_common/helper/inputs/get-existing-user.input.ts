import { ObjectID } from 'mongodb';
import {
  IsEmail,
  IsLowercase,
  IsMongoId,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class GetExistingUserInput {
  @IsMongoId()
  @IsString()
  _id?: ObjectID;

  @IsLowercase()
  @IsEmail()
  email?: string;

  @IsPhoneNumber()
  mobile?: string;
}

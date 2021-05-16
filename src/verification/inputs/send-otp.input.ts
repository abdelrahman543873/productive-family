import { ObjectID } from 'mongodb';
import { IsEmail, IsMongoId, IsOptional, IsPhoneNumber } from 'class-validator';

export class SendOtpInput {
  @IsMongoId()
  @IsOptional()
  user?: ObjectID;

  @IsOptional()
  @IsPhoneNumber('EG')
  mobile?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

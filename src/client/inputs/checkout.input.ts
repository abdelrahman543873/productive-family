import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { ObjectID } from 'mongodb';

export class CheckoutInput {
  @IsMongoId()
  address: ObjectID;

  @IsMongoId()
  payment: ObjectID;

  @IsOptional()
  @IsString()
  code?: string;
}

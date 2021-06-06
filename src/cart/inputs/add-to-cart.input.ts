import { Type } from 'class-transformer';
import { IsMongoId, IsPositive } from 'class-validator';
import { ObjectID } from 'mongodb';

export class AddToCartInput {
  @IsMongoId()
  product: ObjectID;

  @IsMongoId()
  unit: ObjectID;

  @Type(() => Number)
  @IsPositive()
  amount: number;
}

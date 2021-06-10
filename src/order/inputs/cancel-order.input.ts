import { IsMongoId } from 'class-validator';
import { ObjectID } from 'mongodb';
export class CancelOrderInput {
  @IsMongoId()
  order: ObjectID;
}

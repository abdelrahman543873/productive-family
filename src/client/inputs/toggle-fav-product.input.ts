import { IsMongoId } from 'class-validator';
import { ObjectID } from 'mongodb';

export class ToggleFavProductInput {
  @IsMongoId()
  product: ObjectID;
}

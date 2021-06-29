import { ObjectID } from 'mongodb';
import { IsMongoId, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ProviderAddProductInput {
  @IsString()
  enName: string;

  @IsString()
  arName: string;

  @IsString()
  enDescription: string;

  @IsString()
  arDescription: string;

  @IsMongoId()
  category: ObjectID;

  @Type(() => Number)
  @IsNumber()
  preparationTime: number;
}

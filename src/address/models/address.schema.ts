import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectID } from 'mongodb';
import { Point } from '../../_common/spatial-schemas/point.schema';
import { getValuesFromEnum } from '../../_common/utils/column-enum';
import { BuildingTypeEnum } from '../address.enum';

export type AddressDocument = Address & Document;

@Schema({ versionKey: false, timestamps: false })
export class Address {
  _id?: ObjectID;

  @Prop({ type: Point, index: '2dsphere' })
  location: Point;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true })
  building: number;

  @Prop({ required: true })
  floor: number;

  @Prop({ required: true })
  flat: number;

  @Prop({
    enum: getValuesFromEnum(BuildingTypeEnum),
    default: BuildingTypeEnum.HOME,
  })
  buildingType: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

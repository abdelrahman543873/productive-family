import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SpatialType } from './spatial.enum';

@Schema({ versionKey: false, _id: false })
export class Point {
  @Prop({ default: SpatialType.Point, required: true })
  type: string;

  @Prop({ default: SpatialType.Point, required: true, type: [Number] })
  coordinates: number[];
}

export const PointSchema = SchemaFactory.createForClass(Point);

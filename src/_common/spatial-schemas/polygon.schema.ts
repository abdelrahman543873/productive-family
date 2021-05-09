import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SpatialType } from './spatial.enum';

@Schema({ versionKey: false, _id: false })
export class Polygon {
  @Prop({ default: SpatialType.Polygon, required: true })
  type: string;

  @Prop({ default: SpatialType.Point, required: true, type: [[[Number]]] })
  coordinates: number[][][];
}

export const PolygonSchema = SchemaFactory.createForClass(Polygon);

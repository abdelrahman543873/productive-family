import { IsMongoId, IsNumber } from 'class-validator';

export class addDeliveryFeesInput {
  @IsNumber({ maxDecimalPlaces: 2 })
  deliveryFees: number;

  @IsMongoId()
  order: string;
}

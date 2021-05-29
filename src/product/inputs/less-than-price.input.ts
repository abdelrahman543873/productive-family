import { Type } from 'class-transformer';
import { IsPositive } from 'class-validator';

export class LessThanPriceInput {
  @Type(() => Number)
  @IsPositive()
  price: number;
}

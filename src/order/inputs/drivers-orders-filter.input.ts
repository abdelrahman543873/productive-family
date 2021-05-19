import { OrderEnum } from './../order.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class DriverOrdersFilterInput {
  @IsOptional()
  @IsEnum(OrderEnum)
  state: OrderEnum;
}

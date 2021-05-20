import { OrderEnum } from './../order.enum';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';

export class DriverOrdersFilterInput {
  @IsOptional()
  @IsEnum(OrderEnum)
  state?: OrderEnum;

  @IsOptional()
  @IsMongoId()
  provider?: string;
}

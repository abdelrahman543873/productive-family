import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class Pagination {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  offset = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit = 15;
}

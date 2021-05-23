import {
  IsOptional,
  IsString,
  MinLength,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class ClientUpdateProfileInput {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @MinLength(8)
  @IsString()
  password?: string;

  @IsOptional()
  @MinLength(8)
  @IsString()
  newPassword?: string;
}

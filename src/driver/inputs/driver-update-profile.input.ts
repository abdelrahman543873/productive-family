import {
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class DriverUpdateProfileInput {
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

  @IsOptional()
  @IsString()
  notionalId: string;

  @IsOptional()
  @IsLongitude()
  longitude: string;

  @IsOptional()
  @IsLatitude()
  latitude: string;
}

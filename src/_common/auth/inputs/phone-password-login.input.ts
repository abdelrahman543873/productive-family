import {
  IsLatitude,
  IsLongitude,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IsEmail } from 'class-validator';

export class PhoneAndPasswordLoginInput {
  @ValidateIf(o => {
    if (o.email || !o.phone) return true;
    return false;
  })
  @IsNotEmpty()
  @IsLowercase()
  @IsEmail()
  email: string;

  @ValidateIf(o => {
    if (o.phone || !o.email) return true;
    return false;
  })
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @ValidateIf(o => o.lon)
  @IsNotEmpty()
  @IsLatitude()
  lat?: number;

  @ValidateIf(o => o.lat)
  @IsNotEmpty()
  @IsLongitude()
  lon?: number;

  @IsOptional()
  platformDetails?: Record<string, unknown>;
}

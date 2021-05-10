import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class DriverRegisterInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsPhoneNumber('EG')
  mobile: string;

  @IsNotEmpty()
  @IsString()
  notionalId: string;

  @IsLongitude()
  longitude: string;

  @IsLatitude()
  latitude: string;
}

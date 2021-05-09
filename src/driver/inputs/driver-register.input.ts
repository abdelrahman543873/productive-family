import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class DriverRegisterInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsPhoneNumber('EG')
  mobile: string;

  @IsNotEmpty()
  @IsString()
  notionalId: string;

  @IsNumber()
  @IsLongitude()
  longitude: string;

  @IsNumber()
  @IsLatitude()
  latitude: string;
}

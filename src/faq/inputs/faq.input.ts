import { IsNotEmpty, IsString } from 'class-validator';

export class AddFaqInput {
  @IsNotEmpty()
  @IsString()
  enQuestion: string;

  @IsNotEmpty()
  @IsString()
  arQuestion: string;

  @IsNotEmpty()
  @IsString()
  arAnswer: string;

  @IsNotEmpty()
  @IsString()
  enAnswer: string;
}

import { IsMongoId } from 'class-validator';

export class GetDriverOrderInput {
  @IsMongoId()
  order: string;
}

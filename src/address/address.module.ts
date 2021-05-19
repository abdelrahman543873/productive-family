import { Module } from '@nestjs/common';
import { Address, AddressSchema } from './models/address.schema';
import { AddressRepository } from './address.repository';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  providers: [AddressRepository],
})
export class AddressModule {}

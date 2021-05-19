import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Address, AddressDocument } from './models/address.schema';

@Injectable()
export class AddressRepository extends BaseRepository<Address> {
  constructor(
    @InjectModel(Address.name) private addressSchema: Model<AddressDocument>,
  ) {
    super(addressSchema);
  }
}

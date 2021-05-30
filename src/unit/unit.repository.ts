import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../_common/generics/repository.abstract';
import { Unit, UnitDocument } from './models/unit.schema';
@Injectable()
export class UnitRepository extends BaseRepository<Unit> {
  constructor(@InjectModel(Unit.name) private unitSchema: Model<UnitDocument>) {
    super(unitSchema);
  }
}

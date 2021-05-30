import { MongooseModule } from '@nestjs/mongoose';
import { Unit, UnitSchema } from './models/unit.schema';
import { UnitRepository } from './unit.repository';
import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Unit.name, schema: UnitSchema }]),
  ],
  providers: [UnitRepository, UnitService],
})
export class UnitModule {}

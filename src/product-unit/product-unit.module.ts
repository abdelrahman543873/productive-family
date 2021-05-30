import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductUnit,
  ProductUnitSchemaSchema,
} from './models/product-unit.schema';
import { ProductUnitRepository } from './product-unit.repository';
import { ProductUnitService } from './product-unit.service';
import { ProductUnitController } from './product-unit.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductUnit.name, schema: ProductUnitSchemaSchema },
    ]),
  ],
  controllers: [ProductUnitController],
  providers: [ProductUnitRepository, ProductUnitService],
})
export class ProductUnitModule {}

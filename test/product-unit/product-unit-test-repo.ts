import { moduleRef } from 'test/before-test-run';
import { ProductUnitRepository } from '../../src/product-unit/product-unit.repository';

export const ProductUnitRepo = async (): Promise<ProductUnitRepository> =>
  (await moduleRef()).get<ProductUnitRepository>(ProductUnitRepository);

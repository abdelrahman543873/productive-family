import { moduleRef } from 'test/before-test-run';
import { ProductRepository } from '../../src/product/product.repository';

export const ProductRepo = async (): Promise<ProductRepository> =>
  (await moduleRef()).get<ProductRepository>(ProductRepository);

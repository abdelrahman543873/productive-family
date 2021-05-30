import { moduleRef } from 'test/before-test-run';
import { ProductDiscountRepository } from '../../src/product-discount/product-discount.repository';

export const ProductDiscountRepo = async (): Promise<ProductDiscountRepository> =>
  (await moduleRef()).get<ProductDiscountRepository>(ProductDiscountRepository);

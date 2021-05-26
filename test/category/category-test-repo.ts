import { moduleRef } from 'test/before-test-run';
import { CategoryRepository } from '../../src/category/category.repository';

export const CategoryRepo = async (): Promise<CategoryRepository> =>
  (await moduleRef()).get<CategoryRepository>(CategoryRepository);

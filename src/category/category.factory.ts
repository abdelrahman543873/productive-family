import * as faker from 'faker';
import { Category } from './models/category.schema';
import { CategoryRepo } from '../../test/category/category-test-repo';

interface CategoryType {
  enName?: string;
  arName?: string;
  isActive?: boolean;
  imageURL?: string;
}

export const buildCategoryParams = (obj: CategoryType = {}): Category => {
  return {
    enName: obj.enName || faker.random.words(),
    arName: obj.arName || faker.random.words(),
    isActive: obj.isActive || true,
    imageURL: obj.imageURL || faker.internet.url(),
  };
};

export const categoriesFactory = async (
  count = 10,
  obj: CategoryType = {},
): Promise<Category[]> => {
  const faqs: Category[] = [];
  for (let i = 0; i < count; i++) {
    faqs.push(buildCategoryParams(obj));
  }
  return (await CategoryRepo()).addMany(faqs);
};

export const categoryFactory = async (
  obj: CategoryType = {},
): Promise<Category> => {
  const params: Category = buildCategoryParams(obj);
  return (await CategoryRepo()).add(params);
};

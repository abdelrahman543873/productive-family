import { Product } from './models/product.schema';
import { ObjectID } from 'mongodb';
import * as faker from 'faker';
import { providerFactory } from '../provider/provider.factory';
import { ProductRepo } from '../../test/product/product-test-repo';
import { categoryFactory } from '../category/category.factory';

interface ProductType {
  provider?: ObjectID;
  category?: ObjectID;
  enName?: string;
  arName?: string;
  enDescription?: string;
  arDescription?: string;
  preparationTime?: number;
  isActive?: boolean;
  imagesURLs?: string[];
}

export const buildProductParams = async (
  obj: ProductType = {},
): Promise<Product> => {
  return {
    provider: obj.provider || (await providerFactory())._id,
    category: obj.category || (await categoryFactory())._id,
    enName: obj.enName || faker.commerce.product(),
    arName: obj.arName || faker.commerce.product(),
    enDescription: obj.enDescription || faker.commerce.productDescription(),
    arDescription: obj.arDescription || faker.commerce.productDescription(),
    preparationTime: obj.preparationTime || faker.datatype.number(),
    isActive: obj.isActive ?? true,
    imagesURLs: obj.imagesURLs || [faker.internet.url()],
  };
};

export const productsFactory = async (
  count = 10,
  obj: ProductType = {},
): Promise<Product[]> => {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    products.push(await buildProductParams(obj));
  }
  return (await ProductRepo()).addMany(products);
};

export const productFactory = async (
  obj: ProductType = {},
): Promise<Product> => {
  const params: Product = await buildProductParams(obj);
  return (await ProductRepo()).add(params);
};

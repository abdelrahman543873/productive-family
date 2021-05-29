import { Product } from './models/product.schema';
import { ObjectID } from 'mongodb';
import * as faker from 'faker';
import { providerFactory } from '../provider/provider.factory';
import { discountFactory } from '../discount/discount.factory';
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
  rating?: number;
  isActive?: boolean;
  discount?: ObjectID;
  imagesURLs?: string[];
  info?: {
    enUnit?: string;
    arUnit?: string;
    price?: number;
    amount?: number;
  };
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
    rating: obj.rating || faker.datatype.number(5),
    isActive: obj.isActive ?? true,
    discount: obj.discount || (await discountFactory())._id,
    imagesURLs: obj.imagesURLs || [faker.internet.url()],
    info: [
      {
        enUnit: obj?.info?.enUnit ?? faker.random.word(),
        arUnit: obj?.info?.arUnit ?? faker.random.word(),
        price: obj?.info?.price ?? +faker.commerce.price(),
        amount: obj?.info?.amount ?? faker.datatype.number(),
      },
    ],
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

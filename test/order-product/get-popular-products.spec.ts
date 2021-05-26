import { GET_POPULAR_PRODUCTS } from 'test/endpoints/order-product';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import {
  orderProductsFactory,
  orderProductFactory,
} from '../../src/order-product/order-product.factory';
import { clientFactory } from '../../src/client/client.factory';
import { rollbackDbForOrderProduct } from './rollback-for-order-product';
import { providerFactory } from '../../src/provider/provider.factory';
import { productFactory } from '../../src/product/product.factory';
import { TestLocations } from '../test-files/test-locations.enum';
import { SpatialType } from '../../src/_common/spatial-schemas/spatial.enum';

describe('get popular products suite case', () => {
  afterEach(async () => {
    await rollbackDbForOrderProduct();
  });
  it('should get all most popular products', async () => {
    const client = await clientFactory({
      location: {
        type: SpatialType.Point,
        coordinates: TestLocations.SIDI_BISHR,
      },
    });
    const provider = await providerFactory({
      maxDistance: 60,
      location: {
        type: SpatialType.Point,
        coordinates: TestLocations.EL_RAML,
      },
    });
    const product = await productFactory({ provider: provider._id });
    const orders = await orderProductsFactory(3, {
      product: product._id,
      location: {
        type: SpatialType.Point,
        coordinates: TestLocations.EL_RAML,
      },
    });
    const mostPopularProduct = await orderProductFactory({
      product: product._id,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_POPULAR_PRODUCTS,
      token: client.token,
    });
    console.log(res.body);
    // expect(res.body.data.docs[0]._id).toBe(
    //   decodeURI(encodeURI(`${mostPopularProduct.product}`)),
    // );
  });
});

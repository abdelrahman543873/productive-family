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
    // mostPopularProduct
    await orderProductsFactory(2, {
      product: product._id,
      providerLocation: provider.location,
    });
    // less popular product
    await orderProductFactory({
      providerLocation: {
        type: SpatialType.Point,
        coordinates: TestLocations.EL_RAML,
      },
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_POPULAR_PRODUCTS,
      token: client.token,
    });
    expect(res.body.data.docs.length).toBe(2);
    expect(res.body.data.docs[0]._id).toBe(
      decodeURI(encodeURI(`${product._id}`)),
    );
    expect(res.body.data.docs[0].provider._id).toBeTruthy();
    expect(res.body.data.docs[0].category._id).toBeTruthy();
  });

  it("shouldn't get a product if it's outside the providers max distance range", async () => {
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
    // mostPopularProduct
    await orderProductsFactory(2, {
      product: product._id,
      providerLocation: {
        type: SpatialType.Point,
        coordinates: TestLocations.EL_RAML,
      },
    });
    // less popular product
    await orderProductFactory({
      providerLocation: {
        type: SpatialType.Point,
        coordinates: TestLocations.CAIRO,
      },
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_POPULAR_PRODUCTS,
      token: client.token,
    });
    expect(res.body.data.docs.length).toBe(1);
    expect(res.body.data.docs[0]._id).toBe(
      decodeURI(encodeURI(`${product._id}`)),
    );
    expect(res.body.data.docs[0].provider._id).toBeTruthy();
    expect(res.body.data.docs[0].category._id).toBeTruthy();
  });
});

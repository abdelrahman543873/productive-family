import { GET_POPULAR_PRODUCTS } from 'test/endpoints/order-product';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import {
  orderProductsFactory,
  orderProductFactory,
} from '../../src/order-product/order-product.factory';
import { clientFactory } from '../../src/client/client.factory';
import { rollbackDbForOrderProduct } from './rollback-for-order-product';

describe('get popular products suite case', () => {
  afterEach(async () => {
    await rollbackDbForOrderProduct();
  });
  it('should get all most popular products', async () => {
    const client = await clientFactory();
    const orders = await orderProductsFactory();
    const mostPopularProduct = await orderProductFactory({
      product: orders[0].product,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_POPULAR_PRODUCTS,
      token: client.token,
    });
    expect(res.body.data.docs[0]._id).toBe(
      decodeURI(encodeURI(`${mostPopularProduct.product}`)),
    );
  });
});

import { TOGGLE_FAV_PRODUCT } from '../endpoints/client';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { productFactory } from '../../src/product/product.factory';
import { clientFactory } from '../../src/client/client.factory';
describe('toggle fav coupon suite case', () => {
  it('add fav coupon successfully ', async () => {
    const client = await clientFactory();
    const product = await productFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: TOGGLE_FAV_PRODUCT,
      variables: {
        product: product._id,
      },
      token: client.token,
    });
    expect(res.body.data.favProducts.length).toBe(2);
    expect(res.body.data.favProducts[1]).toBe(
      decodeURI(encodeURI(`${product._id}`)),
    );
  });

  it('remove fav coupon successfully ', async () => {
    const client = await clientFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: TOGGLE_FAV_PRODUCT,
      variables: {
        product: client.favProducts[0],
      },
      token: client.token,
    });
    expect(res.body.data.favProducts.length).toBe(0);
  });
});

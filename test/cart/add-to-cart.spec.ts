import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { productFactory } from '../../src/product/product.factory';
import { clientFactory } from '../../src/client/client.factory';
import { ADD_TO_CART } from 'test/endpoints/cart';
import { cartFactory } from '../../src/cart/cart.factory';
describe('add product to cart suite case', () => {
  it('add product to cart successfully ', async () => {
    const client = await clientFactory();
    const product = await productFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_TO_CART,
      variables: {
        product: product._id,
        amount: 50,
      },
      token: client.token,
    });
    expect(res.body.data.product).toBe(decodeURI(encodeURI(`${product._id}`)));
  });

  it('should throw error if product already exists in cart', async () => {
    const client = await clientFactory();
    const product = await productFactory();
    await cartFactory({
      product: product._id,
      client: client._id,
      amount: 1,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_TO_CART,
      variables: {
        product: product._id,
        amount: 50,
      },
      token: client.token,
    });
    expect(res.body.statusCode).toBe(615);
  });

  it('should throw error if product are added from different providers', async () => {
    const client = await clientFactory();
    const product = await productFactory();
    await cartFactory({
      product: product._id,
      client: client._id,
      amount: 1,
    });
    const productFromDifferentProvider = await productFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_TO_CART,
      variables: {
        product: productFromDifferentProvider._id,
        amount: 50,
      },
      token: client.token,
    });
    expect(res.body.statusCode).toBe(617);
  });
});

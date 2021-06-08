import { CHECKOUT } from '../endpoints/client';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { clientFactory } from '../../src/client/client.factory';
import { addressFactory } from '../../src/address/address.factory';
import { paymentFactory } from '../../src/payment/payment.factory';
import { cartFactory } from '../../src/cart/cart.factory';
import { productUnitFactory } from '../../src/product-unit/product-unit.factory';
import { productFactory } from '../../src/product/product.factory';
import { ObjectID } from 'mongodb';
import { GET_CART } from 'test/endpoints/cart';
describe('checkout suite case', () => {
  it('checkout successfully and clear cart', async () => {
    const client = await clientFactory();
    const product = await productFactory();
    const productUnit = await productUnitFactory({ product: product._id });
    await cartFactory({
      client: client._id,
      product: product._id,
      unit: productUnit.unit as ObjectID,
    });
    const address = await addressFactory();
    const payment = await paymentFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CHECKOUT,
      variables: {
        address: address._id,
        payment: payment._id,
      },
      token: client.token,
    });
    expect(res.body.data.client).toBe(decodeURI(encodeURI(`${client._id}`)));
    const res1 = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_CART,
      token: client.token,
    });
    expect(res1.body.data.docs.length).toBe(0);
  });
});

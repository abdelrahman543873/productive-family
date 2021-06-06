import { CHECKOUT } from '../endpoints/client';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { clientFactory } from '../../src/client/client.factory';
import { addressFactory } from '../../src/address/address.factory';
import { paymentFactory } from '../../src/payment/payment.factory';
import { cartFactory } from '../../src/cart/cart.factory';
describe('checkout suite case', () => {
  it('checkout successfully ', async () => {
    const client = await clientFactory();
    await cartFactory({ client: client._id });
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
  });
});

import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { clientFactory } from '../../src/client/client.factory';
import { cartsFactory } from '../../src/cart/cart.factory';
import { GET_CART } from '../endpoints/cart';
describe('get cart suite case', () => {
  it('get cart successfully ', async () => {
    const client = await clientFactory();
    await cartsFactory(10, { client: client._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_CART,
      token: client.token,
    });
    expect(res.body.data.docs[0].category).toBeTruthy();
    expect(res.body.data.docs[0].provider).toBeTruthy();
    expect(res.body.data.docs.length).toBe(10);
  });
});

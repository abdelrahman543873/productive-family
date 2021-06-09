import { orderFactory } from 'src/order/order.factory';
import { GET_CUSTOMER_ORDER } from 'test/endpoints/order';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { clientFactory } from '../../src/client/client.factory';

describe('get customer orders suite case', () => {
  it('should get all customer orders', async () => {
    const client = await clientFactory();
    await orderFactory({ client: client._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_CUSTOMER_ORDER,
      token: client.token,
    });
    expect(res.body.data.docs.length).toBe(1);
  });
});

import { OrderEnum } from 'src/order/order.enum';
import { orderFactory } from 'src/order/order.factory';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { clientFactory } from '../../src/client/client.factory';
import { CANCEL_CUSTOMER_ORDER } from '../endpoints/order';

describe('cancel order suite case', () => {
  it('should cancel order successfully', async () => {
    const client = await clientFactory();
    const order = await orderFactory({ client: client._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CANCEL_CUSTOMER_ORDER,
      token: client.token,
      variables: { order: order._id },
    });
    expect(res.body.data.state).toBe(OrderEnum.CANCELED);
  });
});

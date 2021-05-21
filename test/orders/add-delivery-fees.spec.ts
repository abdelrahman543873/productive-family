import { driverFactory } from 'src/driver/driver.factory';
import { orderFactory } from 'src/order/order.factory';
import { ADD_DELIVERY_FEES, GET_DRIVER_ORDER } from 'test/endpoints/order';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { rollbackDbForOrder } from './rollback-db-for-order';

describe('add delivery fees suite case', () => {
  afterEach(async () => {
    await rollbackDbForOrder();
  });
  it('should add delivery fees', async () => {
    const driver = await driverFactory();
    const order = await orderFactory({ driver: driver._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: ADD_DELIVERY_FEES,
      token: driver.token,
      variables: { order: order._id, deliveryFees: 55.5 },
    });
    expect(res.body.data.deliveryFees).toBe(55.5);
  });
});

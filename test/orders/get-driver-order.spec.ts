import { driverFactory } from 'src/driver/driver.factory';
import { orderFactory } from 'src/order/order.factory';
import { GET_DRIVER_ORDER } from 'test/endpoints/order';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { rollbackDbForOrder } from './rollback-db-for-order';

describe('get driver orders suite case', () => {
  afterEach(async () => {
    await rollbackDbForOrder();
  });
  it('should get all driver orders', async () => {
    const driver = await driverFactory();
    const order = await orderFactory({ driver: driver._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_DRIVER_ORDER}?order=${order._id}`,
      token: driver.token,
    });
    expect(res.body.data.client.name).toBeTruthy();
  });
});

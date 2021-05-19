import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { driverFactory } from '../../src/driver/driver.factory';
import { rollbackDbForOrder } from './rollback-db-for-order';
import { ordersFactory } from '../../src/order/order.factory';
import { GET_DRIVER_ORDERS } from '../endpoints/order';
describe('get driver reviews suite case', () => {
  afterEach(async () => {
    await rollbackDbForOrder();
  });
  it('get driver reviews', async () => {
    const driver = await driverFactory();
    await ordersFactory(10, { driver: driver._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_DRIVER_ORDERS,
      token: driver.token,
    });
    expect(res.body.data.docs.length).toBe(10);
  });
});

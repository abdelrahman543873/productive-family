import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { driverFactory } from '../../src/driver/driver.factory';
import { rollbackDbForOrder } from './rollback-db-for-order';
import { ordersFactory } from '../../src/order/order.factory';
import { GET_DRIVER_ORDERS } from '../endpoints/order';
import { OrderEnum } from 'src/order/order.enum';
describe('get driver orders suite case', () => {
  afterEach(async () => {
    await rollbackDbForOrder();
  });
  it('get driver orders', async () => {
    const driver = await driverFactory();
    await ordersFactory(10, { driver: driver._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_DRIVER_ORDERS,
      token: driver.token,
    });
    expect(res.body.data.docs.length).toBe(10);
  });

  it('get driver active orders', async () => {
    const driver = await driverFactory();
    await ordersFactory(10, { driver: driver._id, state: OrderEnum.SHIPPING });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_DRIVER_ORDERS,
      token: driver.token,
      variables: { state: OrderEnum.SHIPPING },
    });
    expect(res.body.data.docs.length).toBe(10);
  });
});

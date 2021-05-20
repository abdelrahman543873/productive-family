import { Test } from '@nestjs/testing';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { driverFactory } from '../../src/driver/driver.factory';
import { ordersFactory } from '../../src/order/order.factory';
import { rollbackDbForDriver } from './rollback-db-driver';
import { providerDriversFactory } from '../../src/provider-driver/provider-driver.factory';
import { GET_DRIVER_HOME } from 'test/endpoints/driver';
describe('get driver orders suite case', () => {
  afterEach(async () => {
    await rollbackDbForDriver();
  });
  it('should get all driver orders', async () => {
    const driver = await driverFactory();
    await ordersFactory(10, { driver: driver._id });
    await providerDriversFactory(10, { driver: driver._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_DRIVER_HOME,
      token: driver.token,
    });
    expect(res.body.data.providersLocations.length).toBe(10);
    expect(res.body.data.providers).toBe(10);
    expect(res.body.data.orders).toBe(10);
  });
});

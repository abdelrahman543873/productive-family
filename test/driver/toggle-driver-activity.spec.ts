import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { driverFactory } from './../../src/driver/driver.factory';
import { rollbackDbForDriver } from './rollback-db-driver';
import { TOGGLE_DRIVER_ACTIVITY } from '../endpoints/driver';

describe('get driver reviews suite case', () => {
  afterEach(async () => {
    await rollbackDbForDriver();
  });
  it('get driver reviews', async () => {
    const driver = await driverFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: TOGGLE_DRIVER_ACTIVITY,
      token: driver.token,
    });
    expect(res.body.data).toBe(false);
  });
});

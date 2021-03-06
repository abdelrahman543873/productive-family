import { driverFactory } from '../../src/driver/driver.factory';
import { providerDriversFactory } from 'src/provider-driver/provider-driver.factory';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { GET_DRIVER_PROVIDERS } from '../endpoints/provider-driver';

describe('get driver providers suite case', () => {
  it('get driver providers', async () => {
    const driver = await driverFactory();
    await providerDriversFactory(10, { driver: driver._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_DRIVER_PROVIDERS,
      token: driver.token,
    });
    expect(res.body.data.docs[0].role).toBeTruthy();
    expect(res.body.data.docs.length).toBe(10);
  });
});

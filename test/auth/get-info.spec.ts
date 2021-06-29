import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { driverFactory } from '../../src/driver/driver.factory';
import { GET_INFO } from '../endpoints/auth';
import { clientFactory } from '../../src/client/client.factory';
import { providerFactory } from '../../src/provider/provider.factory';
describe('get info suite case', () => {
  it('get driver info', async () => {
    const driver = await driverFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_INFO,
      token: driver.token,
    });
    expect(res.body.data.mobile).toBe(driver.mobile);
  });

  it('get client info', async () => {
    const client = await clientFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_INFO,
      token: client.token,
    });
    expect(res.body.data.mobile).toBe(client.mobile);
  });
  it('get provider info', async () => {
    const provider = await providerFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_INFO,
      token: provider.token,
    });
    expect(res.body.data.mobile).toBe(provider.mobile);
  });
});

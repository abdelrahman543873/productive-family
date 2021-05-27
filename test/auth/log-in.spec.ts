import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { LOGIN } from 'test/endpoints/auth';
import { driverFactory } from '../../src/driver/driver.factory';
import { UserRoleEnum } from '../../src/_common/app.enum';
import { clientFactory } from '../../src/client/client.factory';
import { providerFactory } from '../../src/provider/provider.factory';
import { adminFactory } from '../../src/admin/admin.factory';
import { GET_DRIVER_ORDERS } from 'test/endpoints/order';
describe('login suite case', () => {
  it('login for driver', async () => {
    const driver = await driverFactory({ password: '12345678' });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LOGIN,
      variables: { mobile: driver.mobile, password: '12345678' },
    });
    expect(res.body.data.role).toBe(UserRoleEnum.DRIVER);
  });

  it('should login for driver and get driver orders', async () => {
    const driver = await driverFactory({ password: '12345678' });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LOGIN,
      variables: { mobile: driver.mobile, password: '12345678' },
    });
    const res1 = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_DRIVER_ORDERS,
      token: res.body.data.token,
    });
    expect(res1.body.success).toBe(true);
  });

  it('login for client', async () => {
    const client = await clientFactory({ password: '12345678' });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LOGIN,
      variables: { mobile: client.mobile, password: '12345678' },
    });
    expect(res.body.data.role).toBe(UserRoleEnum.CLIENT);
  });
  it('login for provider', async () => {
    const provider = await providerFactory({ password: '12345678' });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LOGIN,
      variables: { mobile: provider.mobile, password: '12345678' },
    });
    expect(res.body.data.role).toBe(UserRoleEnum.PROVIDER);
  });
  it('login for Admin', async () => {
    const admin = await adminFactory({ password: '12345678' });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LOGIN,
      variables: { mobile: admin.mobile, password: '12345678' },
    });
    expect(res.body.data.role).toBe(UserRoleEnum.ADMIN);
  });
});

import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { DRIVER_REGISTER } from '../endpoints/driver';
import { buildDriverParams } from '../../src/driver/driver.factory';
import { rollbackDbForDriver } from './rollback-db-driver';
describe('register driver suite case', () => {
  afterEach(async () => {
    await rollbackDbForDriver();
  });
  it('register driver', async () => {
    const params = await buildDriverParams();
    delete params.role;
    params['longitude'] = params.location.coordinates[0];
    params['latitude'] = params.location.coordinates[1];
    delete params.location;
    const res = await testRequest(
      HTTP_METHODS_ENUM.POST,
      DRIVER_REGISTER,
      params,
    );
    expect(res.body.data.token).toBeTruthy();
    expect(res.body.data.name).toBe(params.name);
  });
});

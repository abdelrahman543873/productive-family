import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { DRIVER_REGISTER } from '../endpoints/driver';
import { buildDriverParams } from '../../src/driver/driver.factory';
import { rollbackDbForDriver } from './rollback-db-driver';
import path from 'path';
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
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: DRIVER_REGISTER,
      variables: params,
      filePath,
      fileParams: ['imageURL', 'nationalIDImgBack', 'nationalIDImgFront'],
    });
    expect(res.body.data.imageURL).toContain('.jpeg');
    expect(res.body.data.nationalIDImgBack).toContain('.jpeg');
    expect(res.body.data.nationalIDImgFront).toContain('.jpeg');
    expect(res.body.data.token).toBeTruthy();
    expect(res.body.data.name).toBe(params.name);
  });
});

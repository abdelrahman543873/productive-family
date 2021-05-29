import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { DRIVER_REGISTER } from '../endpoints/driver';
import {
  buildDriverParams,
  driverFactory,
} from '../../src/driver/driver.factory';
describe('register driver suite case', () => {
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

  it('should throw error if invalid file types are uploaded', async () => {
    const params = await buildDriverParams();
    delete params.role;
    params['longitude'] = params.location.coordinates[0];
    params['latitude'] = params.location.coordinates[1];
    delete params.location;
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-file.txt`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: DRIVER_REGISTER,
      variables: params,
      filePath,
      fileParams: ['imageURL', 'nationalIDImgBack', 'nationalIDImgFront'],
    });
    expect(res.body.statusCode).toBe(606);
  });

  it('should throw error if mobile already exists', async () => {
    const driver = await driverFactory();
    const params = await buildDriverParams();
    delete params.role;
    params.mobile = driver.mobile;
    params['longitude'] = params.location.coordinates[0];
    params['latitude'] = params.location.coordinates[1];
    delete params.location;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: DRIVER_REGISTER,
      variables: params,
    });
    expect(res.body.statusCode).toBe(602);
  });
});

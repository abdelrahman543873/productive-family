import { DRIVER_UPDATE_PROFILE } from './../endpoints/driver';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import {
  buildDriverParams,
  driverFactory,
} from '../../src/driver/driver.factory';
import { rollbackDbForDriver } from './rollback-db-driver';
describe('update driver suite case', () => {
  it('should update driver', async () => {
    const driver = await driverFactory();
    const params = await buildDriverParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: DRIVER_UPDATE_PROFILE,
      variables: { name: params.name },
      token: driver.token,
    });
    expect(res.body.data.name).toBe(params.name);
  });

  it("should throw error when password or new password is entered only isn't entered", async () => {
    const driver = await driverFactory();
    const params = await buildDriverParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: DRIVER_UPDATE_PROFILE,
      variables: {
        name: params.name,
        newPassword: params.password,
      },
      token: driver.token,
    });
    expect(res.body.statusCode).toBe(400);
    const res1 = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: DRIVER_UPDATE_PROFILE,
      variables: {
        name: params.name,
        password: params.password,
      },
      token: driver.token,
    });
    expect(res1.body.statusCode).toBe(400);
  });

  it('should throw error wrong password is entered', async () => {
    const driver = await driverFactory();
    const params = await buildDriverParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: DRIVER_UPDATE_PROFILE,
      variables: {
        name: params.name,
        newPassword: driver.password,
        password: params.password,
      },
      token: driver.token,
    });
    expect(res.body.statusCode).toBe(607);
  });

  it('should update driver image files', async () => {
    const driver = await driverFactory();
    const params = await buildDriverParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: DRIVER_UPDATE_PROFILE,
      variables: { name: params.name },
      filePath,
      fileParams: ['imageURL', 'nationalIDImgBack', 'nationalIDImgFront'],
      token: driver.token,
    });
    expect(res.body.data.name).toBe(params.name);
    expect(res.body.data.imageURL).toContain('.jpeg');
    expect(res.body.data.nationalIDImgFront).toContain('.jpeg');
    expect(res.body.data.nationalIDImgBack).toContain('.jpeg');
  });
});

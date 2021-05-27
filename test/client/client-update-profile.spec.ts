import { CLIENT_UPDATE_PROFILE } from '../endpoints/client';
import { rollbackDbForClient } from './rollback-for-client';
import {
  buildClientParams,
  clientFactory,
} from '../../src/client/client.factory';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { LOGIN } from 'test/endpoints/auth';

describe('update client suite case', () => {
  it('update client profile', async () => {
    const client = await clientFactory();
    const params = await buildClientParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: CLIENT_UPDATE_PROFILE,
      variables: {
        name: params.name,
      },
      token: client.token,
    });
    expect(res.body.data.name).toBe(params.name);
  });

  it('update client password', async () => {
    const client = await clientFactory({ password: '12345678' });
    await buildClientParams();
    await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: CLIENT_UPDATE_PROFILE,
      variables: {
        password: '12345678',
        newPassword: 'password123',
      },
      token: client.token,
    });
    const res1 = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LOGIN,
      variables: { mobile: client.mobile, password: 'password123' },
    });
    expect(res1.body.data.token).toBeTruthy();
  });

  it('should update driver image files', async () => {
    const driver = await clientFactory();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: CLIENT_UPDATE_PROFILE,
      filePath,
      fileParam: 'imageURL',
      token: driver.token,
    });
    expect(res.body.data.imageURL).toContain('.jpeg');
  });
});

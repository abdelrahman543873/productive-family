import { CLIENT_REGISTER } from './../endpoints/client';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { buildDriverParams } from '../../src/driver/driver.factory';
import {
  buildClientParams,
  clientFactory,
} from '../../src/client/client.factory';
describe('register client suite case', () => {
  it('register client', async () => {
    const params = await buildClientParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CLIENT_REGISTER,
      variables: {
        mobile: params.mobile,
        password: params.password,
        name: params.name,
      },
    });
    expect(res.body.data.name).toBe(params.name);
  });

  it('should throw error if mobile already exists', async () => {
    const client = await clientFactory();
    const params = await buildDriverParams();
    params.mobile = client.mobile;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CLIENT_REGISTER,
      variables: {
        mobile: params.mobile,
        password: params.password,
        name: params.name,
      },
    });
    expect(res.body.statusCode).toBe(602);
  });
});

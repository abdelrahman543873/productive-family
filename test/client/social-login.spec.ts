import { SOCIAL_CLIENT_LOGIN } from './../endpoints/client';
import { buildClientParams } from 'src/client/client.factory';
import { SOCIAL_CLIENT_REGISTER } from 'test/endpoints/client';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { rollbackDbForClient } from './rollback-for-client';
import { clientFactory } from '../../src/client/client.factory';

describe('social login client suite case', () => {
  afterEach(async () => {
    await rollbackDbForClient();
  });
  it('social login client', async () => {
    const client = await clientFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: SOCIAL_CLIENT_LOGIN,
      variables: {
        socialMediaId: client.socialMediaId,
      },
    });
    expect(res.body.data.socialMediaId).toBe(client.socialMediaId);
    expect(res.body.data.token).toBeTruthy();
  });
});

import { SOCIAL_CLIENT_LOGIN } from './../endpoints/client';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { clientFactory } from '../../src/client/client.factory';

describe('social login client suite case', () => {
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

import { buildClientParams } from 'src/client/client.factory';
import { SOCIAL_CLIENT_REGISTER } from 'test/endpoints/client';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { rollbackDbForClient } from './rollback-for-client';

describe('social register client suite case', () => {
  afterEach(async () => {
    await rollbackDbForClient();
  });
  it('social register client', async () => {
    const params = await buildClientParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: SOCIAL_CLIENT_REGISTER,
      variables: {
        name: params.name,
        socialMediaId: params.socialMediaId,
        socialMediaType: params.socialMediaType,
      },
    });
    expect(res.body.data.socialMediaId).toBe(params.socialMediaId);
    expect(res.body.data.isVerified).toBe(true);
  });
});

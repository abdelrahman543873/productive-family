import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { rollbackDbForProvider } from './rollback-for-provider';
import { providersFactory } from '../../src/provider/provider.factory';
import { clientFactory } from '../../src/client/client.factory';
import { GET_NEW_PROVIDERS } from '../endpoints/provider';

describe('get client providers suite case', () => {
  it('get client providers', async () => {
    const client = await clientFactory();
    await providersFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_NEW_PROVIDERS,
      token: client.token,
    });
    expect(res.body.data.docs.length).toBe(10);
  });
});

import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { rollbackDbForFaq } from './rollback-db-faq';
import { ADD_FAQ } from '../endpoints/faq';
import { buildFaqParams } from '../../src/faq/faq.factory';
import { UserRoleEnum } from '../../src/_common/app.enum';
import { adminFactory } from 'src/admin/admin.factory';
describe('add faq suite case', () => {
  it('add Faq', async () => {
    const user = await adminFactory({ role: UserRoleEnum.ADMIN });
    const variables = await buildFaqParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_FAQ,
      variables,
      token: user.token,
    });
    expect(res.body.data.enAnswer).toBe(variables.enAnswer);
  });
});

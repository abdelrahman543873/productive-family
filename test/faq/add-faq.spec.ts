import { faqsFactory } from 'src/faq/faq.factory';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { rollbackDbForFaq } from './rollback-db-faq';
import { ADD_FAQ } from '../endpoints/faq';
import { buildFaqParams } from '../../src/faq/faq.factory';
describe('add faq suite case', () => {
  afterEach(async () => {
    await rollbackDbForFaq();
  });
  it('add Faq', async () => {
    await faqsFactory();
    const params = await buildFaqParams();
    const res = await testRequest(HTTP_METHODS_ENUM.POST, ADD_FAQ, params);
    expect(res.body.data.enAnswer).toBe(params.enAnswer);
  });
});

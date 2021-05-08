import { faqsFactory } from 'src/faq/faq.factory';
import { GET_FAQS } from 'test/endpoints/faq';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { rollbackDbForFaq } from './rollback-db-faq';
describe('get faqs suite case', () => {
  afterEach(async () => {
    await rollbackDbForFaq();
  });
  it('get faqs', async () => {
    await faqsFactory();
    const res = await testRequest(HTTP_METHODS_ENUM.GET, GET_FAQS);
    expect(res.body.data.length).toBe(10);
  });
});

import { faqsFactory } from 'src/faq/faq.factory';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { GET_FAQS } from '../endpoints/faq';
describe('get faqs suite case', () => {
  it('get Faqs', async () => {
    await faqsFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_FAQS,
    });
    expect(res.body.data.length).toBeGreaterThanOrEqual(10);
  });
});

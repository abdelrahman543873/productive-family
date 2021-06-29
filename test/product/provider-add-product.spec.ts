import { PROVIDER_ADD_PRODUCT } from 'test/endpoints/product';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { providerFactory } from '../../src/provider/provider.factory';
import { buildProductParams } from '../../src/product/product.factory';

describe('provider add product suite case', () => {
  it('provider should add product', async () => {
    const provider = await providerFactory();
    const params = await buildProductParams({ provider: provider._id });
    delete params.imagesURLs;
    delete params.isActive;
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: `${PROVIDER_ADD_PRODUCT}`,
      token: provider.token,
      variables: params,
      filePath,
      fileParam: 'imagesURLs',
    });
    expect(res.body.data.enName).toBe(params.enName);
    expect(res.body.data.imagesURLs[0]).toContain('.jpeg');
  });
});

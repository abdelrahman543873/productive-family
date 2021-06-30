import { HTTP_METHODS_ENUM } from './../request.methods.enum';
import { PROVIDER_REGISTER } from '../endpoints/provider';
import { testRequest } from 'test/request';
import { buildProviderParams } from '../../src/provider/provider.factory';
import { TestLocations } from '../test-files/test-locations.enum';
describe('provider register suite case', () => {
  it('should register provider successfully', async () => {
    const providerParams = await buildProviderParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      filePath,
      url: PROVIDER_REGISTER,
      fileParam: 'imagesURLs',
      method: HTTP_METHODS_ENUM.POST,
      variables: {
        name: providerParams.name,
        email: providerParams.email,
        mobile: providerParams.mobile,
        password: providerParams.password,
      },
      headers: {
        long: TestLocations.SIDI_BISHR[0],
        lat: TestLocations.SIDI_BISHR[1],
      },
    });
    expect(res.body.data.email).toBe(providerParams.email);
    expect(res.body.data.imagesURLs[0]).toContain('.jpeg');
    expect(res.body.data.location.coordinates[0]).toBe(
      TestLocations.SIDI_BISHR[0],
    );
  });

  it('should register provider successfully without file upload', async () => {
    const providerParams = await buildProviderParams();
    const res = await testRequest({
      url: PROVIDER_REGISTER,
      method: HTTP_METHODS_ENUM.POST,
      variables: {
        name: providerParams.name,
        email: providerParams.email,
        mobile: providerParams.mobile,
        password: providerParams.password,
      },
      headers: {
        long: TestLocations.SIDI_BISHR[0],
        lat: TestLocations.SIDI_BISHR[1],
      },
    });
    expect(res.body.data.email).toBe(providerParams.email);
  });

  it('should throw error if location not provided', async () => {
    const providerParams = await buildProviderParams();
    const res = await testRequest({
      url: PROVIDER_REGISTER,
      method: HTTP_METHODS_ENUM.POST,
      variables: {
        name: providerParams.name,
        email: providerParams.email,
        mobile: providerParams.mobile,
        password: providerParams.password,
      },
    });
    expect(res.body.statusCode).toBe(612);
  });
});

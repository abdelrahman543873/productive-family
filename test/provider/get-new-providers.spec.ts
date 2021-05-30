import { TestLocations } from './../test-files/test-locations.enum';
import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { providerFactory } from '../../src/provider/provider.factory';
import { clientFactory } from '../../src/client/client.factory';
import { GET_NEW_PROVIDERS } from '../endpoints/provider';
import { SpatialType } from 'src/_common/spatial-schemas/spatial.enum';

describe('get client providers suite case', () => {
  it('get client providers', async () => {
    const client = await clientFactory({
      location: {
        type: SpatialType.Point,
        coordinates: TestLocations.SIDI_BISHR,
      },
    });
    const providerInRange = await providerFactory({
      maxDistance: 10,
      location: {
        type: SpatialType.Point,
        coordinates: TestLocations.EL_RAML,
      },
    });
    const providerNotInRange = await providerFactory({
      maxDistance: 10,
      location: {
        type: SpatialType.Point,
        coordinates: TestLocations.CANADA,
      },
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_NEW_PROVIDERS}?limit=500`,
      token: client.token,
    });
    const correctResult = res.body.data.docs.filter(provider => {
      return provider._id === decodeURI(encodeURI(`${providerInRange._id}`));
    });
    const incorrectResult = res.body.data.docs.filter(provider => {
      return provider._id === decodeURI(encodeURI(`${providerNotInRange._id}`));
    });
    expect(correctResult.length).toBe(1);
    expect(incorrectResult.length).toBe(0);
  });
});

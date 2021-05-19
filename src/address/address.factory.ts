import * as faker from 'faker';
import { getValuesFromEnum } from 'src/_common/utils/column-enum';
import { BuildingTypeEnum } from './address.enum';
import { Address } from './models/address.schema';
import { Point } from '../_common/spatial-schemas/point.schema';
import { SpatialType } from '../_common/spatial-schemas/spatial.enum';
import { AddressRepo } from '../../test/address/address-test-repo';

interface AddressType {
  location?: Point;
  isActive?: boolean;
  building?: number;
  floor?: number;
  flat?: number;
  buildingType?: BuildingTypeEnum;
}

export const buildAddressParams = (obj: AddressType = {}): Address => {
  return {
    location: obj.location || {
      type: SpatialType.Point,
      coordinates: [+faker.address.longitude(), +faker.address.latitude()],
    },
    isActive: obj.isActive ?? true,
    building: obj.building || faker.datatype.number(),
    floor: obj.floor || faker.datatype.number(),
    flat: obj.flat || faker.datatype.number(),
    buildingType:
      obj.buildingType ||
      faker.random.arrayElement(getValuesFromEnum(BuildingTypeEnum)),
  };
};

export const addressesFactory = async (
  count = 10,
  obj = <any>{},
): Promise<Address[]> => {
  const addresses: Address[] = [];
  for (let i = 0; i < count; i++) {
    addresses.push(buildAddressParams(obj));
  }
  return (await AddressRepo()).addMany(addresses);
};

export const addressFactory = async (obj = <any>{}): Promise<Address> => {
  const params: Address = buildAddressParams(obj);
  return (await AddressRepo()).add(params);
};

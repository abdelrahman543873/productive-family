import { ApiBodyOptions } from '@nestjs/swagger';

export const driverRegisterSchema: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      mobile: {
        type: 'string',
      },
      notionalId: {
        type: 'string',
      },
      longitude: {
        type: 'string',
      },
      latitude: {
        type: 'string',
      },
      imageURL: {
        type: 'string',
        format: 'binary',
      },
      nationalIDImgFront: {
        type: 'string',
        format: 'binary',
      },
      nationalIDImgBack: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

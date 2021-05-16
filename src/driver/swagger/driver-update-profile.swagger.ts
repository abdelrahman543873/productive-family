import { ApiBodyOptions } from '@nestjs/swagger';

export const driverUpdateProfileSchema: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      newPassword: {
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

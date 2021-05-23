import { ApiBodyOptions } from '@nestjs/swagger';

export const clientUpdateProfileSchema: ApiBodyOptions = {
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
      imageURL: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

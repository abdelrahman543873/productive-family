import { ApiBodyOptions } from '@nestjs/swagger';

export const ProviderRegisterSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      mobile: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      imagesURLs: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

import { ApiBodyOptions } from '@nestjs/swagger';

export const driverHomeSchema: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      providers: { type: 'number' },
      wallet: { type: 'number' },
      orders: { type: 'number' },
    },
  },
};

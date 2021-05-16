import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const sendOtpSchema: SchemaObject = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
  },
};

import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const HasRoles = (...args: string[]): CustomDecorator =>
  SetMetadata('roles', args);

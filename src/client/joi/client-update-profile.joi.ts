import * as Joi from 'joi';

export const ClientUpdateProfileJoi = Joi.object({
  name: Joi.string().min(3),
  password: Joi.string()
    .min(8)
    .disallow(Joi.ref('newPassword')),
  newPassword: Joi.string()
    .min(8)
    .optional(),
})
  .with('password', 'newPassword')
  .with('newPassword', 'password')
  .min(1);

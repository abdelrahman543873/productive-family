import * as Joi from 'joi';

export const DriverUpdateProfileJoi = Joi.object({
  name: Joi.string().min(3),
  notionalId: Joi.string().min(3),
  longitude: Joi.number(),
  latitude: Joi.number(),
  password: Joi.string()
    .min(8)
    .disallow(Joi.ref('newPassword')),
  newPassword: Joi.string()
    .min(8)
    .optional(),
})
  .with('password', 'newPassword')
  .with('newPassword', 'password')
  .with('longitude', 'latitude')
  .with('latitude', 'longitude')
  .min(1);

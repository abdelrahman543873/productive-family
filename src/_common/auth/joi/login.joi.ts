import * as Joi from 'joi';

export const LoginJoi = Joi.object({
  password: Joi.string().min(8),
  mobile: Joi.string(),
  socialMediaId: Joi.string(),
})
  .with('password', 'mobile')
  .with('mobile', 'password')
  .without('socialMediaId', ['password', 'mobile']);

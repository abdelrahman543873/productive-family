import * as Joi from 'joi';

export const VerifyOtpJoi = Joi.object({
  user: Joi.string(),
  code: Joi.string().required(),
  mobile: Joi.string(),
  email: Joi.string().email(),
}).min(2);

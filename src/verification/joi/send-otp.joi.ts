import * as Joi from 'joi';

export const SendOtpJoi = Joi.object({
  user: Joi.string(),
  mobile: Joi.string(),
  email: Joi.string().email(),
}).min(1);

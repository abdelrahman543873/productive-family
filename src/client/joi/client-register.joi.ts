import * as Joi from 'joi';
import { getValuesFromEnum } from '../../_common/utils/column-enum';
import { SocialMediaType } from '../social-media.enum';

export const ClientRegisterJoi = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),
  password: Joi.string().min(8),
  mobile: Joi.string(),
  socialMediaId: Joi.string(),
  socialMediaType: Joi.string().valid(...getValuesFromEnum(SocialMediaType)),
})
  .with('password', 'mobile')
  .without('socialMediaId', 'password')
  .with('socialMediaId', ['socialMediaType'])
  .without('password', ['socialMediaId', 'socialMediaType']);

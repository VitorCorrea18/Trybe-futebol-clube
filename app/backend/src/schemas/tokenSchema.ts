import * as Joi from 'joi';

const tokenSchema = Joi.object({
  token: Joi.string().required(),
});

export default tokenSchema;

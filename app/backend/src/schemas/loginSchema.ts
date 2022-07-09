import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }), // https://stackoverflow.com/questions/57972358/joi-email-validation
  password: Joi.string().required(),
});

export default loginSchema;

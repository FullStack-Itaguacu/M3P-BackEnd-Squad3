const Joi = require("joi");

const environmentShema = Joi.object({

  DIALECT: Joi.string().required(),  
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),



  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default("1d"),
  JWT_REFRESH_SECRET: Joi.string().required(),

  PORT: Joi.number().default(3000),

  BUCKET : Joi.required(),
  AWSREGION : Joi.required(),
  AWSACCESS_KEY_ID : Joi.required(),
  AWSSECRET_ACCESS_KEY : Joi.required(),
});

module.exports = environmentShema;

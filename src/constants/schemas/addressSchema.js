const Joi = require('joi');
const typeStatesEnum = require('../enums/typeStatesEnum');

const states = typeStatesEnum;

const addressSchema = Joi.object({



  zip: Joi.string().length(8).regex(/^[0-9]+$/).required().messages({
    'string.length': `CEP precisa ter {#limit} caracteres`,
    'string.empty': `CEP não pode ser vazio`,
    'any.required': `CEP é um campo obrigatório`
  }),

  street: Joi.string().required().messages({
    'string.empty': `Rua não pode ser vazio`,
    'any.required': `Rua é um campo obrigatório`
  }),

  numberStreet: Joi.alternatives().try(
    Joi.string(),
    Joi.number()).required().messages({
    'string.empty': `Número não pode ser vazio`,
    'any.required': `Número é um campo obrigatório`
  }),

  neighborhood: Joi.string().required().messages({
    'string.empty': `Bairro não pode ser vazio`,
    'any.required': `Bairro é um campo obrigatório`
  }),

  city: Joi.string().required().messages({
    'string.empty': `Cidade não pode ser vazio`,
    'any.required': `Cidade é um campo obrigatório`
  }),

  state: Joi.string().valid(...states).required().messages({
    'any.only': 'Estado precisa ser um estado válido do Brasil',
    'string.empty': `Estado não pode ser vazio`,
    'any.required': `Estado é um campo obrigatório`
  }),
    
  complement: Joi.string().allow(null),

  lat: Joi.string().allow(null),

  long: Joi.string().allow(null),

  createdAt: Joi.date(),

  updatedAt: Joi.date(),

  deletedAt: Joi.date()

});

module.exports = addressSchema;
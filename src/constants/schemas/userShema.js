const Joi = require('joi');
const validateDate = require('../../services/validateDate');

const userSchema = Joi.object({

  
  
  fullName: Joi.string().min(2).max(50).required().messages({
    'string.empty': `Nome não pode ser vazio`,
    'string.min': `Nome precisa ter no mínimo {#limit} caracteres`,
    'string.max': `Nome precisa ter no máximo {#limit} caracteres`,
    'string.empty': `Nome não pode ser vazio`,
    'any.required': `Nome é um campo obrigatório`
  }),

  cpf: Joi.string().length(11).regex(/^[0-9]+$/).required().messages({
    'string.pattern.base': `CPF precisa conter apenas números`,
    'string.length': `CPF precisa ter {#limit} caracteres`,
    'string.empty': `CPF não pode ser vazio`,
    'any.required': `CPF é um campo obrigatório`
  }),

  birthDate: Joi.string()
  .required()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .messages({
    'string.pattern.base': `Data de nascimento precisa estar no formato YYYY-MM-DD`,
    'any.required': `Data de nascimento é um campo obrigatório`
  })
  .custom((value, helpers) => {
    if (!validateDate(value)) {
      return helpers.message(`Usuário precisa ter pelo menos 16 anos de idade`);
    }
    return value;
  }),

  email: Joi.string().email().required().messages({
    'string.email': `E-mail precisa ser um e-mail válido`,
    'string.empty': `E-mail não pode ser vazio`,
    'any.required': `E-mail é um campo obrigatório`
  }),

  phone:  Joi.string().regex(/^(?:(?:\+|00)\d{1,3}\s?)?(?:\(\d{2}\)\s?)?(?!([0-9])\1{7,})(\d{4,5}-\d{4}|\d{11})$/
  ).allow(null).required().messages({
    'string.pattern.base': `Informe um telefone válido (EX:48999999999))`,
    'string.empty': `Telefone não pode ser vazio`,
    'any.required': `Telefone é um campo obrigatório`
  }),

  password: Joi.string().min(8)
  .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/).required()
  .messages({
    'string.pattern.base': `Senha precisa conter letras maiúsculas, minúsculas e números`,
    'string.min': `Senha precisa ter no mínimo {#limit} caracteres`,
    'string.empty': `Senha não pode ser vazio`,
    'any.required': `Password é um campo obrigatório`
  }),

  typeUser: Joi.string().valid('ADMIN', 'BUYER').messages({
    'any.only': `Tipo de usuário inválido (ADMIN ou BUYER)`,
    'string.empty': `Tipo de usuário não pode ser vazio`,
    'any.required': `Tipo de usuário é um campo obrigatório`
  }),

  createdBy: Joi.number().integer(),

});

module.exports = userSchema;
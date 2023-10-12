const Joi = require('joi');
const typeProductEnum = require('../enums/typeProductEnum');
const typeDosageEnum = require('../enums/typeDosageEnum');

const productSchema = Joi.object({


  name: Joi.string().required().messages({
    'string.empty': `Nome não pode ser vazio`,
    'any.required': `Nome é um campo obrigatório`
  }),

  labName: Joi.string().required().messages({
    'string.empty': `Nome do laboratório não pode ser vazio`,
    'any.required': `Nome do laboratório é um campo obrigatório`
  }),

  imageLink: Joi.string().uri().required().messages({
    'string.uri': `Link da imagem precisa ser uma URL válida`,
    'string.empty': `Link da imagem não pode ser vazio`,
    'any.required': `Link da imagem é um campo obrigatório`
  }),

  dosage: Joi.number().required().messages({
    'number.base': `Dosagem precisa ser um número`,
    'number.empty': `Dosagem não pode ser vazio`,
    'any.required': `Dosagem é um campo obrigatório...`
  }),

  typeDosage: Joi.string().valid(...typeDosageEnum).required().messages({
    'any.only': `typeDosage precisa ser uma dosagem válida ${typeDosageEnum.join(', ')}`,
    'string.empty': `typeDosage não pode ser vazio`,
    'any.required': `typeDosage é um campo obrigatório`
  }),

  unitPrice: Joi.number().precision(2).min(0.01).required().messages({
    'number.base': `Preço unitário precisa ser um número`,
    'number.empty': `Preço unitário não pode ser vazio`,
    'number.min': `Preço unitário precisa ser maior que zero`,
    'any.required': `Preço unitário é um campo obrigatório`
  }),

  totalStock: Joi.number().integer().min(1).required().messages({
    'number.base': `Estoque total precisa ser um número inteiro`,
    'number.empty': `Estoque total não pode ser vazio`,
    'number.min': `Estoque total precisa ser maior que zero`,
    'any.required': `Estoque total é um campo obrigatório`
  }),

  typeProduct: Joi.string().valid(...typeProductEnum).required().messages({
    'any.only': `Tipo de produto precisa ser um tipo de produto válido ${typeProductEnum.join(', ')}`,
    'string.empty': `Tipo de produto não pode ser vazio`,
    'any.required': `Tipo de produto é um campo obrigatório`
  }),

  description: Joi.string().allow(null, '').messages({
    'string.empty': `Descrição não pode ser vazio`,
  }),


});

module.exports = productSchema;
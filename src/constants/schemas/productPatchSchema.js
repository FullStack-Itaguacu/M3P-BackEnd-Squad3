
const Joi = require('joi'); 
const typeDosageEnum = require('../enums/typeDosageEnum');

const productPatchSchema = Joi.object({
  name: Joi.string().optional().messages({
    'string.empty': `Nome não pode ser vazio`,
  }),
  
  imageLink: Joi.string().uri().optional().messages({
    'string.uri': `Link da imagem precisa ser uma URL válida`,
    'string.empty': `Link da imagem não pode ser vazio`,
  }),
  
  dosage: Joi.string().optional().messages({
    'any.only': `Dosagem precisa ser uma dosagem válida ${typeDosageEnum.join(', ')}`,
    'string.empty': `Dosagem não pode ser vazio`,
  }),

  totalStock: Joi.number().integer().min(0).required()
}).options({
  abortEarly: false, 
  allowUnknown: true
}).messages({
    'any.required': `É necessário informar ao menos um campo para atualizar`,
    });

module.exports = productPatchSchema;
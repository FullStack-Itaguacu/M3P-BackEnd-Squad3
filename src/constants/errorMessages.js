const typeProductEnum = require("./enums/typeProductEnum");


const ERROR_MESSAGES = {

  INVALID_CPF: {
    message: "CPF inválido",
    code: "INVALID_CPF",
  },

  SERVER_ERROR: "Erro interno do servidor",
  INVALID_CEP: {
    message: "CEP inválido",
    code: "INVALID_CEP",
  },
  INVALID_EMAIL: {
    message: "Email inválido",
    code: "INVALID_EMAIL",
  },
  UNAUTHORIZED: {
    message: "Usuário não autorizado",
    code: "UNAUTHORIZED",
  },
  INVALID_PHONE: {
    message: "Telefone inválido",
    code: "INVALID_PHONE",
  },
  INVALID_PASSWORD: {
    message: "Senha inválida",
    cause: "Senha precisa conter letras maiúsculas, minúsculas e números",
    code: "INVALID_PASSWORD",
  },
  INVALID_USER: {
    message: "Usuário inválido",
    code: "INVALID_USER",
  },
  INVALID_ADDRESS: "Endereço inválido",

  CPF_ALREADY_EXISTS: {
    message: "CPF já cadastrado",
    code: "CPF_ALREADY_EXISTS",
  },
  EMAIL_ALREADY_EXISTS: {
    message: "Email já cadastrado",
    code: "EMAIL_ALREADY_EXISTS",
  },
  EMAIL_OR_PASSWORD_IS_INCORRECT : {
    message: "Email ou senha incorretos",
    code: "EMAIL_OR_PASSWORD_IS_INCORRECT",
  },
  INVALID_DATA_LOGIN: {
    message: "Os campos email e password são obrigatórios",
    code: "INVALID_DATA_LOGIN",
  },
<<<<<<< HEAD
=======
  TYPE_USER_REQUIRED: {
    message: "O campo typeUser é obrigatório para esta operação",
    code: "TYPE_USER_REQUIRED",
  },
  FORBIDDEN: {
    message: "Usuário não autorizado",
    code: "FORBIDDEN",
  },
  NOT_FOUND: {
    message: "Não encontrado",
    code: "NOT_FOUND",
  },


  INVALID_TYPE_PRODUCT: {
    message: `Os valores permitidos para o campo typeProduct são: ${typeProductEnum.join(", ")}`,
    code: "INVALID_TYPE_PRODUCT",
  },
  
>>>>>>> bc00e0d5a4798e7ecfa7f3a52bb60c560385ab7a
};


module.exports = ERROR_MESSAGES;

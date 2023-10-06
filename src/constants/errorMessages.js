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
  TYPE_USER_REQUIRED: {
    message: "O campo typeUser é obrigatório para esta operação",
    code: "TYPE_USER_REQUIRED",
  },
  FORBIDDEN: {
    message: "Usuário não autorizado",
    code: "FORBIDDEN",
  }, 
};


module.exports = ERROR_MESSAGES;

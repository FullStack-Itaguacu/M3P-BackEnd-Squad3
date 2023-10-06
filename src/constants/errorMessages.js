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

  MISSING_REQUIRED_FIELDS:  {
    message: "Preencha todos os campos obrigatórios!",
    code: "MISSING_REQUIRED_FIELDS",
  },
  
  INVALID_PAYMENT_TYPE: {
    message: "O campo type_payment está em um formato inválido.",
    code: "INVALID_PAYMENT_TYPE",
  },

  INSUFFICIENT_PRODUCT_QUANTITY:{
    message: "Quantidade de produtos insuficiente ou produto não encontrado",
    code: "INSUFFICIENT_PRODUCT_QUANTITY",
  },

  FAILED_TO_CREATE: {
    message: "Não foi possível fazer o cadastro!",
    code: "FAILED_TO_CREATE",
  }
};


module.exports = ERROR_MESSAGES;

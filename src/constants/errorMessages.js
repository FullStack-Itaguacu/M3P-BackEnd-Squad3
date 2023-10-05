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
  UNAUTHORIZED: "Não autorizado",
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
};

module.exports = ERROR_MESSAGES;

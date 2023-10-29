const typePaymentEnum = require("./enums/typePaymentEnum");
const typeProductEnum = require("./enums/typeProductEnum");

const ERROR_MESSAGES = {
  PRODUCT_ALREADY_REGISTERED: {
    message: "Produto já cadastrado",
    code: "PRODUCT_ALREADY_REGISTERED",
    cause: "Produto já cadastrado no sistema",
  },
  INVALID_CPF: {
    message: "CPF inválido",
    code: "INVALID_CPF",
    cause: "CPF precisa conter 11 dígitos",
  },

  SERVER_ERROR: "Erro interno do servidor",
  INVALID_CEP: {
    message: "CEP inválido",
    code: "INVALID_CEP",
    cause: "CEP precisa conter 8 dígitos",
  },
  INVALID_EMAIL: {
    message: "Email inválido",
    code: "INVALID_EMAIL",
    cause: "Email precisa conter @ e .com",
  },
  UNAUTHORIZED: {
    message: "Usuário não autorizado",
    code: "UNAUTHORIZED",
    cause: "Usuário não autorizado para esta operação",
  },
  UNAUTHORIZED_LOGIN: {
    message: "Usuário não autorizado",
    code: "UNAUTHORIZED_LOGIN",
    cause: "Email ou senha incorretos",
  },
  UNREGISTERED_USER:{
    message: "Usuário não cadastrado",
    code: "UNREGISTERED_USER",
    cause: "Usuário não cadastrado no sistema",
  },
  
  INVALID_PHONE: {
    message: "Telefone inválido",
    code: "INVALID_PHONE",
    cause: "Telefone precisa conter 11 dígitos",
  },
  INVALID_PASSWORD: {
    message: "Senha inválida",
    code: "INVALID_PASSWORD",
    cause: "Senha precisa conter letras maiúsculas, minúsculas e números",
  },
  INVALID_USER: {
    message: "Usuário inválido",
    code: "INVALID_USER",
    cause: "Usuário não encontrado",
  },
  INVALID_ADDRESS: "Endereço inválido",

  CPF_ALREADY_EXISTS: {
    message: "CPF já cadastrado",
    code: "CPF_ALREADY_EXISTS",
    cause: "CPF já cadastrado no sistema",
  },
  EMAIL_ALREADY_EXISTS: {
    message: "Email já cadastrado",
    code: "EMAIL_ALREADY_EXISTS",
    cause: "Email já cadastrado no sistema",
  },
  EMAIL_OR_PASSWORD_IS_INCORRECT: {
    message: "Email ou senha incorretos",
    code: "EMAIL_OR_PASSWORD_IS_INCORRECT",
    cause: "Email ou senha incorretos",
  },
  INVALID_DATA_LOGIN: {
    message: "Os campos email e password são obrigatórios",
    code: "INVALID_DATA_LOGIN",
    cause: "Os campos email e password são obrigatórios",
  },

  TYPE_USER_REQUIRED: {
    message: "Campo requerido para esta operação invalido",
    code: "TYPE_USER_REQUIRED",
    cause: "O campo typeUser é obrigatório para esta operação",
  },
  FORBIDDEN: {
    message: "Usuário não autorizado",
    code: "FORBIDDEN",
    cause: "Usuário não autorizado para esta operação",
  },
  NOT_FOUND: {
    message: "Não encontrado",
    code: "NOT_FOUND",
    cause: "Não encontrado",
  },

  INVALID_TYPE_PRODUCT: {
    message: `Os valores permitidos para o campo typeProduct são: ${typeProductEnum.join(
      ", "
    )}`,
    code: "INVALID_TYPE_PRODUCT",
    cause: `Os valores permitidos para o campo typeProduct são: ${typeProductEnum.join(
      ", "
    )}`,
  },

  FAILED_TO_LIST_EN: {
    message:
      "Erro ao listar compras, verifique se está autenticado como comprador!",
    code: "FAILED_TO_LIST_EN",
    cause: "Erro ao listar compras, verifique se está autenticado como comprador!",
  },

  FAILED_TO_LIST: {
    message: "Falha ao tentar listar compras!",
    code: "FAILED_TO_LIST",
    cause: "Falha ao tentar listar compras! verifique se esta logado e tente novamente",
  },

  FAILED_TO_LIST_ADMIN: {

    message: "Erro ao listar compras, verifique se você esta autenticado como vendedor!",
    code: "FAILED_TO_LIST_ADMIN",
    cause: "Erro ao listar compras, verifique se você esta autenticado como vendedor!",
  },

  PRODUCT_NOT_FOUND: {
    message: "Produto não encontrado",
    code: "PRODUCT_NOT_FOUND",
    cause: "Produto não encontrado",
  },
  INVALID_DATA: {
    message: "Dados inválidos",
    code: "INVALID_DATA",
    cause: "Dados inválidos",
  },

INVALID_DATA_BODY: {
    message: "Necessario enviar todos os campos obrigatórios",
    code: "INVALID_DATA_BODY",
    cause: "Necessario enviar todos os campos validos obrigatórios para esta operação",
  },
  INVALID_USER_ADDRESS_ID :{
    message:"Id de endereço inexistente!",
    code: "INVALID_USER_ADDRESS_ID",
    cause: "Id de endereço inexistente ou invalido!",
  },

  MISSING_REQUIRED_FIELDS:{
    message: "Campos obrigatórios: {productId, amountBuy, userAddressId, typePayment}",
    code: "MISSING_REQUIRED_FIELDS",
    cause: "Campos obrigatórios: {productId, amountBuy, userAddressId, typePayment}",
  },
  INSUFFICIENT_PRODUCT_QUANTITY:{
    message: "Quantidade insuficiente de produtos",
    code: "INSUFFICIENT_PRODUCT_QUANTITY",
    cause: "Quantidade insuficiente de produtos",
  },
  INVALID_PAYMENT_TYPE:{
    message: `Tipo de pagamento inválido (Os valores permitidos para o campo typePayment são: ${typePaymentEnum.join(", ")})`,
    code: "INVALID_PAYMENT_TYPE",
    cause: `Tipo de pagamento inválido (Os valores permitidos para o campo typePayment são: ${typePaymentEnum.join(", ")})`,
  },
  UNIC_TYPE_PAYMENT:{
    message: "Todos os itens devem ter o mesmo tipo de pagamento",
    code: "UNIC_TYPE_PAYMENT",
    cause: "Todos os itens devem ter o mesmo tipo de pagamento",
  },
  INVALID_NAME: {
    message: "Nome inválido",
    code: "INVALID_NAME",
  },
  INVALID_IMAGE_LINK: {
    message: "Link da imagem inválido",
    code: "INVALID_IMAGE_LINK",
    cause: "Link da imagem deve ser uma url valida",
  },
  INVALID_DOSAGE: {
    message: "Dosagem inválida não pode ser vazia",
    code: "INVALID_DOSAGE",
    cause: "Dosagem inválida não pode ser vazia",
  },
  INVALID_TOTAL_STOCK: {
    message: "Estoque inválido",
    code: "INVALID_TOTAL_STOCK",
    cause: "Estoque não pode ser enviado como vazio",
  },
  IVALID_BODY_ADDRESS_ARRAY: {
    message: "O campo address deve ser um array",
    code: "IVALID_BODY_ADDRESS_ARRAY",
    cause: "Os endereços devem ser enviados em um array",
  },
  INVALID_TYPE_USER: {
    message: "O campo typeUser deve ser ADMIN ou BUYER",
    code: "INVALID_TYPE_USER",
    cause: "O campo typeUser deve ser ADMIN ou BUYER",
  },
  
  BAD_REQUEST_LOGIN: {
    message: "Os campos email e password são obrigatórios",
    code: "BAD_REQUEST_LOGIN",
    cause: "Os campos email e password são obrigatórios",
  }

};

module.exports = ERROR_MESSAGES;

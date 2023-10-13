const typePaymentEnum = require("./enums/typePaymentEnum");
const typeProductEnum = require("./enums/typeProductEnum");

const ERROR_MESSAGES = {
  PRODUCT_ALREADY_REGISTERED: {
    message: "Produto já cadastrado",
    code: "PRODUCT_ALREADY_REGISTERED",
  },
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
  UNREGISTERED_USER:{
    message: "Usuário não cadastrado",
    code: "UNREGISTERED_USER",
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
  EMAIL_OR_PASSWORD_IS_INCORRECT: {
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
  NOT_FOUND: {
    message: "Não encontrado",
    code: "NOT_FOUND",
  },

  INVALID_TYPE_PRODUCT: {
    message: `Os valores permitidos para o campo typeProduct são: ${typeProductEnum.join(
      ", "
    )}`,
    code: "INVALID_TYPE_PRODUCT",
  },

  FAILED_TO_LIST_EN: {
    message:
      "Erro ao listar compras, verifique se está autenticado como comprador!",
    code: "FAILED_TO_LIST_EN",
  },

  FAILED_TO_LIST: {
    message: "Falha ao tentar listar compras!",
    code: "FAILED_TO_LIST",
  },

  FAILED_TO_LIST_ADMIN: {

    message: "Erro ao listar compras, verifique se você esta autenticado como vendedor!",

    code: "FAILED_TO_LIST_ADMIN"
  },

  PRODUCT_NOT_FOUND: {
    message: "Produto não encontrado",
    code: "PRODUCT_NOT_FOUND",
  },
  INVALID_DATA: {
    message: "Dados inválidos",
    code: "INVALID_DATA",
  },

INVALID_DATA_BODY: {
    message: "Necessario enviar todos os campos obrigatórios",
    code: "INVALID_DATA_BODY",
  },
  INVALID_USER_ADDRESS_ID :{
    message:"Id de endereço inexistente!",
    code: "INVALID_USER_ADDRESS_ID"
  },

  MISSING_REQUIRED_FIELDS:{
    message: "Campos obrigatórios: {productId, amountBuy, userAddressId, typePayment}",
    code: "MISSING_REQUIRED_FIELDS"
  },
  INSUFFICIENT_PRODUCT_QUANTITY:{
    message: "Quantidade insuficiente de produtos",
    code: "INSUFFICIENT_PRODUCT_QUANTITY"
  },
  INVALID_PAYMENT_TYPE:{
    message: `Tipo de pagamento inválido (Os valores permitidos para o campo typePayment são: ${typePaymentEnum.join(", ")})`,
    code: "INVALID_PAYMENT_TYPE"
  },
  UNIC_TYPE_PAYMENT:{
    message: "Todos os itens devem ter o mesmo tipo de pagamento",
    code: "UNIC_TYPE_PAYMENT"
  },
  INVALID_NAME: {
    message: "Nome inválido",
    code: "INVALID_NAME",
  },
  INVALID_IMAGE_LINK: {
    message: "Link da imagem inválido",
    code: "INVALID_IMAGE_LINK",
  },
  INVALID_DOSAGE: {
    message: "Dosagem inválida não pode ser vazia",
    code: "INVALID_DOSAGE",
  },
  INVALID_TOTAL_STOCK: {
    message: "Estoque inválido",
    code: "INVALID_TOTAL_STOCK",
  },
  IVALID_BODY_ADDRESS_ARRAY: {
    message: "O campo address deve ser um array",
    code: "IVALID_BODY_ADDRESS_ARRAY",
  },
  


};

module.exports = ERROR_MESSAGES;

const ERROR_MESSAGES = require('../constants/errorMessages');
const { cpfValidator } = require('../utils/cpfValidator');
const { emailValidator } = require('../utils/emailValidator');
const { formatCpf } = require('../utils/formatCpf');
const { phoneValidator } = require('../utils/phoneValidator');

async function validateUserInput({ cpf, email, phone }) {
  const validationResults = {};

  if (cpf) {
    const cpfValid = await cpfValidator(cpf);
    validationResults.cpf = cpfValid;
  }

  if (email) {
    const emailValid = await emailValidator(email);
    validationResults.email = emailValid;
  }

  if (phone) {
    const phoneValid = await phoneValidator(phone);
    validationResults.phone = phoneValid;
  }

 
  const errorMessages = {};
  if (!validationResults.cpf) {
    errorMessages.cpf = ERROR_MESSAGES.INVALID_CPF;
  }
  if (!validationResults.email) {
    errorMessages.email = ERROR_MESSAGES.INVALID_EMAIL;
  }
  if (!validationResults.phone) {
    errorMessages.phone = ERROR_MESSAGES.INVALID_PHONE;
  }


  if (Object.keys(errorMessages).length > 0) {
    return {
      isValid: false,
      errors: errorMessages,
    };
  }

  if (cpf) {
    const cpfFormatted = await formatCpf(cpf);
    cpf = cpfFormatted; 
  }

  return {
    isValid: true,
    data: {
      cpf,
      email,
      phone,
    },
  };
}

module.exports = validateUserInput;

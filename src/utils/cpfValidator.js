const cpfCheck = require('cpf-check');

async function cpfValidator(cpf) {
  return cpfCheck.validate(cpf);
}

module.exports = {
  cpfValidator
};
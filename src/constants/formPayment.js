const { ENUM } = require("sequelize");

module.exports = ENUM([
  "money",
  "credit card",
  "debit card",
  "pix",
  "bank slip",
  "bank transfer",
]);

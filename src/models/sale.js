const { INTEGER, NUMBER } = require("sequelize");
const { dbConnection } = require("../database/dbConnection");
const formPayment = require("../constants/formPayment");

const Sale = dbConnection.define("sale", {
  id: {
    primaryKey: true,
    autoIncrement: true,
  },

  buyerId: {
    allowNull: true,
    references: {
      model: { tableName: "" },
      key: "id,",
    },
  },

  sellerId: {
    allowNull: true,
    references: {
      model: { tableName: "" },
      key: "id,",
    },
  },

  amountBuy: {
    allowNull: false,
    references: {
      model: { tableName: "product" },
      key: "id",
    },
  },

  addressUserId: {
    allowNull: false,
    references: {
      model: { tableName: "address" },
      key: "id",
    },
  },

  productUnitPrice: {
    type: NUMBER,
    allowNull: false,
  },

  quantityProductSold: {
    type: INTEGER,
    allowNull: false,
  },

  saleDate: {
    type: DATE,
    allowNull: false,
  },

  totalSalePrice: {
    type: NUMBER,
    allowNull: false,
  },

  formPayment: {
    type: formPayment,
    allowNull: false,
  },
});

module.exports = { Sale };

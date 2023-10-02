const { INTEGER, NUMBER } = require("sequelize");
const { dbConnection } = require("../database/dbConnection");
const formPayment = require("../constants/formPayment");

const Sale = dbConnection.define("sale", {
  id: {
    primaryKey: true,
    autoIncrement: true,
  },

  idBuyer: {
    allowNull: true,
    references: {
      model: { tableName: "" },
      key: "id,",
    },
  },

  idSeller: {
    allowNull: true,
    references: {
      model: { tableName: "" },
      key: "id,",
    },
  },

  idProductSold: {
    allowNull: false,
    references: {
      model: { tableName: "product" },
      key: "id",
    },
  },

  idAddressSale: {
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

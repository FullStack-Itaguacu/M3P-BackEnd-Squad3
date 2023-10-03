const paymentType = require("../constants/paymentType");
const { dbConnection } = require("../database/dbConnection");
const { INTEGER, NUMBER, DATE, STRING } = require("sequelize");

const Sale = dbConnection.define(
  "sale",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },

    buyerId: {
      allowNull: true,
      references: {
        model: { tableName: "user" },
        key: "id",
      },
    },

    sellerId: {
      allowNull: true,
      references: {
        model: { tableName: "sale" },
        key: "id",
      },
    },
    userAddressId: {
      allowNull: true,
      references: {
        model: { tableName: "address" },
        key: "id",
      },
    },

    amountBuy: {
      type: NUMBER,
      allowNull: false,
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
      type: paymentType,
      allowNull: false,
    },

    createdAt: {
      type: DATE,
      allowNull: true,
    },

    updatedAt: {
      type: DATE,
      allowNull: true,
    },

    deletedAt: {
      type: DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
  }
);

module.exports = { Sale };

const paymentType = require("../constants/paymentType");
const { dbConnection } = require("../database/dbConnection");
<<<<<<< HEAD
const { INTEGER, NUMBER, DATE, DECIMAL } = require("sequelize");
=======

const { INTEGER, NUMBER, DATE, STRING } = require("sequelize");

>>>>>>> 642e2c5329ea7a05e2558c86f1d08c95f21fc807

const Sale = dbConnection.define(
  "sale",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    buyerId: {
      type: INTEGER,
      allowNull: true,
      references: {
        model: { tableName: "user" },
        key: "id",
      },
    },

    sellerId: {
      type: INTEGER,
      allowNull: true,
      references: {
        model: { tableName: "sale" },
        key: "id",
      },
    },
    userAddressId: {
      type: INTEGER,
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
      type: DECIMAL(10, 2),
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
      type: DECIMAL(10, 2),
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

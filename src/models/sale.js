const paymentType = require("../constants/paymentType");
const { dbConnection } = require("../database/dbConnection");
const { INTEGER, NUMBER, DATE, DECIMAL } = require("sequelize");

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
        model: { tableName: "users" },
        key: "id",
      },
    },

    sellerId: {
      type: INTEGER,
      allowNull: true,
      references: {
        model: { tableName: "users" },
        key: "id",
      },
    },
    productId: {
      type: INTEGER,
      references: {
        model:{
        tableName: 'products'
      },
      key: 'id'
    },
      allowNull: false
    },
    userAddressId: {
      type: INTEGER,
      allowNull: true,
      references: {
        model: { tableName: "users_address" },
        key: "id",
      },
    },

    amountBuy: {
      type: NUMBER,
      allowNull: false,
    },

    total: {
      type: DECIMAL(10, 2),
      allowNull: false,
    },

    typePayment: {
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

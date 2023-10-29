
const typePaymentEnum = require("../constants/enums/typePaymentEnum");
const { dbConnection } = require("../database/dbConnection");
const { INTEGER, DATE, ENUM } = require("sequelize");


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
    addressId: {
      type: INTEGER,
      allowNull: true,
      references: {
        model: { tableName: "address" },
        key: "id",
      },
    },


    total: {
      type: INTEGER,
      allowNull: false,
    },

    typePayment: {
      type: ENUM(...typePaymentEnum),
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
    paranoid: true,
    timestamps: true,
  }
);

module.exports = { Sale };

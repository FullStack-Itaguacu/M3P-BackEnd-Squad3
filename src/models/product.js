import tipoProduto from "../constants/tipoProduto";
const { INTEGER, BLOB, NUMBER, DATE, STRING } = require("sequelize");
const { dbConnection } = require("../database/dbConnection");

const Product = dbConnection.define(
  "product",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    productName: {
      type: STRING,
      allowNull: false,
    },

    laboratoryName: {
      type: STRING,
      allowNull: false,
    },

    image: {
      type: BLOB,
      allowNull: false,
    },

    dosage: {
      type: ENUM("mg", "mcg", "g", "mL", "%", "outro"),
      allowNull: false,
    },

    productDescription: {
      type: STRING,
      allowNull: true,
    },

    productUnitPrice: {
      type: NUMBER,
      allowNull: false,
    },

    productType: {
      type: tipoProduto,
      allowNull: false,
    },

    quantityStock: {
      type: INTEGER,
      allowNull: false,
    },

    productRegistrationDate: {
      type: DATE,
      allowNull: false,
    },

    idUsers: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: { tableName: "users" },
        key: "id",
      },
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

module.exports = { Product };

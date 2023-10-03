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

    userId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: { tableName: "user" },
        key: "id",
      },
    },

    productName: {
      type: STRING,
      allowNull: false,
    },

    laboratoryName: {
      type: STRING,
      allowNull: false,
    },

    imageLink: {
      type: BLOB,
      allowNull: false,
    },

    dosage: {
      type: ENUM("mg", "mcg", "g", "mL", "%", "outro"),
      allowNull: false,
    },

    unitPrice: {
      type: DECIMAL(10, 2),
      allowNull: false,
    },

    totalPrice: {
      type: DECIMAL(10, 2),
      allowNull: false,
    },

    totalStock: {
      type: INTEGER,
      allowNull: false,
    },

    typeProduct: {
      type: ENUM("Medicamento controlado", "Medicamento não controlado"),
      allowNull: false,
    },

    description: {
      type: STRING,
      allowNull: true,
    },

    registrationDate: {
      type: DATE,
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

module.exports = { Product };

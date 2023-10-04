
const {
  INTEGER,
  BLOB,
  NUMBER,
  DATE,
  STRING,
  DECIMAL,
  ENUM,
} = require("sequelize");
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
      type: STRING,
      allowNull: false,
    },

    dosage: {
      type: ENUM("mg", "mcg", "g", "mL", "%", "outro"),
      allowNull: false,
    },

    unitPrice: {
      type: DECIMAL,
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

    productType: {
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

const {
  INTEGER,
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

    name: {
      type: STRING,
      allowNull: false,
    },

    labName: {
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

module.exports = { Product };

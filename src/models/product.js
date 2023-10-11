const {
  INTEGER,
  DATE,
  STRING,
  DECIMAL,
  ENUM,
  NUMBER,
} = require("sequelize");
const { dbConnection } = require("../database/dbConnection");
const typeDosageEnum = require("../constants/enums/typeDosageEnum");
const typeProductEnum = require("../constants/enums/typeProductEnum");

const Product = dbConnection.define(
  "product",
  {
    id: {
      type:INTEGER,
      primaryKey: true,  
      autoIncrement: true 
    },

    userId: {
      type: INTEGER,
      allowNull: true,
      references: {
        model: { tableName: "users" },
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
      type: NUMBER,
      allowNull: false,
    },
    typeDosage: {
      type: ENUM(...typeDosageEnum),
      allowNull: false,
    },

    unitPrice: {
      type: DECIMAL,
      allowNull: false,
    },

    totalStock: {
      field: 'total_stock' ,
      type: INTEGER,
      allowNull: false,
    },

    typeProduct: {
      type: ENUM(...typeProductEnum),
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

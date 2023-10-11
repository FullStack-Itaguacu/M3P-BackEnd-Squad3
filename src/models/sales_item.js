const { dbConnection } = require("../database/dbConnection");
const { DataTypes } = require("sequelize");

const SalesItem = dbConnection.define(
  "sales_items",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sales',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users', 
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products', 
        key: "id",
      },
    },
    amountBuy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
  }
);

module.exports = { SalesItem };

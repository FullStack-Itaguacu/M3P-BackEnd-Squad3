const { dbConnection } = require("../database/dbConnection");
const { STRING, DATE, INTEGER, NUMBER, ENUM } = require("sequelize");
const typeStatesEnum = require("../constants/enums/typeStatesEnum");

const Address = dbConnection.define(
  "address",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    zip: {
      type: NUMBER,
      allowNull: false,
      validade: {
        len: {
          args: [8],
          msg: "CEP precisa ter 8 dígitos.",
        },
      },
    },

    street: {
      type: STRING,
      allowNull: false,
    },

    numberStreet: {
      type: STRING,
      allowNull: false,
    },

    neighborhood: {
      type: STRING,
      allowNull: false,
    },

    city: {
      type: STRING,
      allowNull: false,
    },

    state: {
    type: ENUM(...typeStatesEnum),
    allowNull: false,
    },

    complement: {
      type: STRING,
      allowNull: true,
    },

    lat: {
      type: STRING,
      allowNull: true,
    },
    long: {
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
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
  }
);

module.exports = { Address };

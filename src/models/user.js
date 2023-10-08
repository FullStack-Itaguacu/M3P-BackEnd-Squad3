const { INTEGER, STRING, DATE, ENUM } = require("sequelize");
const { dbConnection } = require("../database/dbConnection");
const typeUserEnum = require("../constants/enums/typeUserEnum");

const User = dbConnection.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    fullName: {
      type: STRING,
      allowNull: false,
      validate: {
        len: { args: [2, 50], msg: "Nome precisa ter entre 2 a 20 char." },
      },
    },

    cpf: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: { args: [11, 11], msg: "CPF precisa ter 11 char." },
      },
    },

    birthDate: {
      type: DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },

    },

    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    phone: {
      type: STRING,
      allowNull: true,
      validate: {
        isNumeric: true, // Usando isNumeric para validar apenas números
      },
    },


    password: {
      type: STRING,
      allowNull: false,
      validate: {
        len: { args: [8], msg: "Senha precisa ter minimo 8 caracteres" },
        
      },
    },

    typeUser: {
      type: ENUM(...Object.values(typeUserEnum)),
      defaultValue: typeUserEnum.BUYER,
      allowNull: false,
      validate: {
        isIn: [Object.values(typeUserEnum)],
      },
    },

    createdBy: {
      type: INTEGER,
      allowNull: true,
      references: {
        model: "users",
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
  { underscored: true }
);

module.exports = { User };

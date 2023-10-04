const { INTEGER, STRING, DATE, ENUM } = require ('sequelize')
const {dbConnection} = require('../database/dbConnection');

const User = dbConnection.define('user', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      fullName: {
        type: STRING,
        allowNull:false,
        validate:{
            len: {args: [2, 50], msg: "Nome precisa ter entre 2 a 20 char."},
        },
    },

    cpf: {
        type: STRING,
        allowNull: false,
        validate:{
            isNumeric: true,
            len: {args: [11, 11], msg: "CPF precisa ter 11 char."},
        },
    },

    birthData:{
        type: DATE,
        allowNull: false,
        validate: {
            isDate: true,
        },
    },

    email: {
        type: STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },

    phone: {
        type: STRING,
        allowNull: true,
        validate:{
            isNumeric: true, // Usando isNumeric para validar apenas números
        },
    },

    password:{
        type: STRING,
        allowNull: false,
        validate: {
            len: {args: [8, 12], msg: "Senha precisa ter entre 8 a 15 char."},
            strongPassword(value) {
                const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
                if (!strongPasswordRegex.test(value)) {
                  throw new Error(
                    'Senha deve conter pelo menos 1 letra maiúscula, minúscula e numeros, entre 8 á 12 diígitos'
                  );
                }
            }
        },
    },


    typeUser:{
        type: ENUM("administrador", "comprador"),
        allowNull:false,
        validate:{
            isIn: [['administrador', 'comprador']]
        },
    },

    created_by:{
        type: STRING,
        allowNull: true
    },

    createdAt: {
        type: DATE,
        allowNull: true,
      },

      updatedAt: {
        type:DATE,
        allowNull: true,
      },

      deletedAt: {
        type: DATE,
        allowNull: true,
      },
    
},  {  underscored: true })

module.exports = {User};


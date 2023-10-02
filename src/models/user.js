const { INTEGER, STRING, DATE, ENUM } = require ('sequelize')
const {dbConnection} = require('../database/dbConnection');

const User = dbConnection.define('user', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
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
            len: {args: [11, 11], msg: "CPF precisa ter 11 char."},
        },
    },

    dt_birth:{
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

    telephone: {
        type: STRING,
        allowNull: true,
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

    users_id: {
        type: INTEGER,
        references: {
            model: address,
            key: 'id'
        },
        allowNull: false
    },

    type_user:{
        type: ENUM("administrador", "comprador"),
        allowNull:false,
        validate:{
            isIn: [['administrador', 'comprador']]
        },
    },
    
},  {  underscored: true })

//Falta fazer as relações

module.exports = {User};
const {Sequelize} = require('sequelize');

const dbConfig = require('../config/db.config');


const dbConnection = new Sequelize(dbConfig);



module.exports = {dbConnection};
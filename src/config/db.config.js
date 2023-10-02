const config = require('./config.server');

const postgress= config.postgres

module.exports = {
  dialect: "postgres", 
  host: postgress.host, 
  username: postgress.user, 
  password: postgress.password, 
  database: postgress.database,
  port: postgress.port, 
  define: {
    underscored: true,
    underscoredAll: true
  }
};



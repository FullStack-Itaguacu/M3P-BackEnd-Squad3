const dotenv = require('dotenv');
const environmentShema = require('./environmentShema');

dotenv.config();

const { error, value } = environmentShema.validate(process.env, {
    stripUnknown: true 
  });

if (error) {
  throw new Error(`Invalid env variables: ${error.message}`);
}

const config = {

  // postgres
  postgres: {
    host: value.POSTGRES_HOST,
    port: value.POSTGRES_PORT,
    user: value.POSTGRES_USER,
    password: value.POSTGRES_PASSWORD,
    database: value.POSTGRES_DATABASE,
  },

  //type of database
    dialect: value.DIALECT,

  // JWT
    jwtSecret: value.JWT_SECRET,
    jwtExpiresIn: value.JWT_EXPIRES_IN,
    jwtRefreshSecret: value.JWT_REFRESH_SECRET,



  // Server
    port: value.PORT,

    // AWS

    bucket: value.BUCKET,
    awsRegion: value.AWSREGION,
    awsAccessKeyId: value.AWSACCESS_KEY_ID,
    awsSecretAccessKey: value.AWSSECRET_ACCESS_KEY,
    
}

module.exports = config;
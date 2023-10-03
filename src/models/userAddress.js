
const { DataTypes, Model } = require('sequelize');
const dbConnection = require('../database/dbConnection').dbConnection;



class UserAddress extends Model {}

UserAddress.init({
    
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },

  addressId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'address',
      key: 'id' 
    }
  }

}, {
  sequelize:dbConnection,
  modelName: 'user_address'
}); 

module.exports = UserAddress;
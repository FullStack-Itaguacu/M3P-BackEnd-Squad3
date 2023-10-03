
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database');

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
      model: 'addresses',
      key: 'id' 
    }
  }

}, {
  sequelize,
  modelName: 'user_address'
}); 

module.exports = UserAddress;
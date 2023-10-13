const { DataTypes, Model } = require('sequelize');

const dbConnection = require('../database/dbConnection').dbConnection;

const {User} = require('./user'); 


class UserAddress extends Model {}

UserAddress.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, 
      key: 'id'
    }
  }
}, 
{
  freezeTableName: true,
  sequelize: dbConnection,
  modelName: 'users_address' 
});


// Relacionamentos
User.hasOne(UserAddress);  
UserAddress.belongsTo(User);


module.exports = {UserAddress};
const { DataTypes, Model } = require('sequelize');

const dbConnection = require('../database/dbConnection').dbConnection;

const {User} = require('./user'); 
const {Address} = require('./address');

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
  },
  addressId: {
   type: DataTypes.INTEGER,
    references: {
     model: Address,  
      key: 'id'
    }
  }
}, 
{
  freezeTableName: true,
  sequelize: dbConnection,
  modelName: 'users_address' 
});


User.belongsToMany(Address, { through: UserAddress });
Address.belongsToMany(User, { through: UserAddress });

UserAddress.belongsTo(User);
UserAddress.belongsTo(Address);

module.exports = {UserAddress};
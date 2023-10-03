const {User} = require('./user');
const {Address} = require('./address');
const UserAddress = require('./userAddress');

User.hasMany(UserAddress);
Address.hasMany(UserAddress);

UserAddress.belongsTo(User);
UserAddress.belongsTo(Address); 

module.exports = {
  User,
  Address,
  UserAddress
};
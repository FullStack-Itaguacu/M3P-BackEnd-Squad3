
const {User} = require('./user');
const {Address} = require('./address');
const UserAddress = require('./userAddress');

const relations = {

  User: {
    hasMany: {
      addresses: {
        model: UserAddress,
        as: 'addresses',
        foreignKey: 'userId'
      }
    },
    
    belongsTo: {
      parent: {
        model: User,
        as: 'users',
        foreignKey: 'userId'
      },
      createdBy: {
        model: User,
        as: 'CreatedBy',
        foreignKey: 'created_by'  
      }
    }
  },

  Address: {
    hasMany: {
      users: {
        model: UserAddress,
        as: 'users',
        foreignKey: 'addressId'
      }
    }
  },

  UserAddress: {
    belongsTo: {
      user: {
        model: User, 
        foreignKey: 'userId'
      },
      address: {
        model: Address,
        foreignKey: 'addressId'
      }
    }
  }

};

module.exports = {
  relations
};
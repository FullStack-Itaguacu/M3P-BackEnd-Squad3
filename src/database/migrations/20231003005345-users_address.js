'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('users_address', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      }, 

      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model:{
          tableName: 'users'
        },
        key: 'id'
      },
        allowNull: false
      },

      address_id: {
        type: Sequelize.INTEGER,
        references: {
          model:{
          tableName: 'address'
        },
        key: 'id'
      },
        allowNull: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    
    });
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('users_address');
    
  }
};

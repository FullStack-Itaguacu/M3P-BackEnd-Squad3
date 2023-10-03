'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('sales', { 
      id:{
        type: Sequelize.INTEGER ,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      }, 

      buyer_id: {
        type: Sequelize.INTEGER,
        references: {
          model:{
          tableName: 'users'
        },
        key: 'id'
      },
        allowNull: true
      },

      seller_id: {
        type: Sequelize.INTEGER,
        references: {
          model:{
          tableName: 'products'
        },
        key: 'id'
      },
        allowNull: true
      },

      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model:{
          tableName: 'products'
        },
        key: 'id'
      },
        allowNull: false
      },

      unit_price: {
        type: Sequelize.INTEGER,
        references: {
          model:{
          tableName: 'products'
        },
        key: 'id'
      },
        allowNull: false
      },

      amount_buy: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      user_address_id: {
        type: Sequelize.INTEGER,
        references: {
          model:{
          tableName: 'users_address'
        },
        key: 'id'
      },
        allowNull: false
      },

      total: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },

      type_payment: {
        type: Sequelize.STRING,
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

    })
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('sales');
    
  }
};

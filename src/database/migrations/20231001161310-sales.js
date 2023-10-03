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

      users_id: {
        type: Sequelize.INTEGER,
        references: {
          model:{
          tableName: 'users'
        },
        key: 'id'
      },
        allowNull: true
      },

      name_admin_id: {
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

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      adderss_id: {
        type: Sequelize.INTEGER,
        references: {
          model:{
          tableName: 'address'
        },
        key: 'id'
      },
        allowNull: false
      },

      dt_sale: {
        type: Sequelize.DATE,
        allowNull: false
      },

      hour_sale: {
        type: Sequelize.TIME,
        allowNull: false
      },

      price_total: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },

      type_product: {
        type: Sequelize.STRING,
        allowNull: false
      },

      payment_method:{
        type: Sequelize.STRING,
          allowNull: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
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

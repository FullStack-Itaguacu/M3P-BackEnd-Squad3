'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_items', {
      id: {
        autoIncrement: true, 
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sale_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sales',
          key: 'id'
        }
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',  
          key: 'id'
        },
        allowNull: false
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'products' },
          key: 'id'
        }
      },
      amount_buy: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE  
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales_items');
  }
};
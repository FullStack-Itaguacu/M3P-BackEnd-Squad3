'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.createTable('products', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        }, 

        name_product: {
          type: Sequelize.STRING,
          allowNull: false
        },

        name_admin :{
          type: Sequelize.STRING,
          allowNull: false
        },

        img_product: {
        type: Sequelize.STRING,
        allowNull: false
        },

        description: {
          type: Sequelize.STRING,
          allowNull: true
        },

        unit_price: {
          type: Sequelize.DECIMAL,
          allowNull: false
        },

        type_product: {
          type: Sequelize.STRING,
          allowNull: false
        },

        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        dt_registration: {
          type: Sequelize.DATE,
          allowNull: false
        },

        user_id:{
          type: Sequelize.INTEGER,
            references: {
              model:{
              tableName: 'users'
            },
            key: 'id'
          },
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
      });
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.dropTable('products');
    
  }
};

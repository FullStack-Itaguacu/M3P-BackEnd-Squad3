'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.createTable('address', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        }, 
      
        cep: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      
        address: {
          type: Sequelize.STRING,
          allowNull: false
        },
      
        number: {
          type: Sequelize.STRING,
          allowNull: false
        },

        neighborhood: {
          type: Sequelize.STRING,
          allowNull: false
        },

        city: {
          type: Sequelize.STRING,
          allowNull: false
        },

        state: {
          type: Sequelize.STRING,
          allowNull: false
        },

        complement: {
          type: Sequelize.STRING,
          allowNull: true
        },

        latitude: {
          type: Sequelize.STRING,
          allowNull: true
        },

        longitude: {
          type: Sequelize.STRING,
          allowNull: true
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
  
      await queryInterface.dropTable('address');
    
  }
};
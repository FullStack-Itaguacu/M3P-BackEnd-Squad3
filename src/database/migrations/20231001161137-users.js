'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.createTable('users', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        }, 
      
        full_name:{
          type: Sequelize.STRING,
          allowNull: false
        },

        cpf: {
          type: Sequelize.STRING,
          allowNull: false
        },

        dt_birth: {
          type: Sequelize.DATE,
          allowNull: false
        },

        email:{
          type: Sequelize.STRING,
          allowNull: false
        },

        telephone:{
          type: Sequelize.STRING,
          allowNull: false
        },

          password: {
            type: Sequelize.STRING,
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

          type_user:{
            type: Sequelize.STRING,
            allowNull:false,
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
    
      await queryInterface.dropTable('users');
    
  }
};

'use strict';

const { ENUM } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_status: {
        type: Sequelize.ENUM( 
       'PENDENTE',   
       'PAGO',       
       'ENVIADO',     
       'ENTREGUE',  
       'CANCELADO' ),
       defaultValue: 'PENDENTE'
        
      },
      user_id: {
        type: Sequelize.INTEGER,
         allowNull: false,
      },
      total: {
        type: Sequelize.DOUBLE,
         allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    
    
      
    });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
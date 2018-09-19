'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nome: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      senha_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data_cadastro: {
        allowNull: false,
        type: Sequelize.DATE
      },
      data_atualizacao: {
        allowNull: false,
        type: Sequelize.DATE
      },
      acesso: {
        type: Sequelize.ENUM,
        values: ['admin', 'cliente'],
        allowNull: false,
        defaultValue: 'cliente'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios');
  }
};

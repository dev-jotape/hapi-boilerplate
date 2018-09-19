'use strict';

const _email = 'jpsilva1206@gmail.com';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const model = queryInterface.sequelize.import('../../src/models/usuario.models');
    const usuario = new model({
      nome: 'João Pedro',
      email: _email,
      senha: '2FmjrU3t',
      acesso: 'admin'
    });

    return await usuario.save();
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', { email: _email });
  }
};


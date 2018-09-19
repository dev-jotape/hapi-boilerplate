'use strict';

const Controller = require('./controller');
const Validator = require('./validation');

module.exports = {
  register: async (server) => {
    server.route([
      {
        method: 'POST',
        path: '/auth',
        config: {
          auth: false,
          description: 'Autenticação de Usuário',
          notes: 'Retornar a autenticação de usuário',
          tags: ['api'], // ADD THIS TAG
          handler: Controller.auth,
          validate: Validator.auth()
        }
      }
    ]);
  },
  name: 'autenticacao-public-route',
  version: '1.0.0'
};
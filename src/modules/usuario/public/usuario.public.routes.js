'use strict';

const Controller = require('./usuario.public.controller');

module.exports = {
  register: async (server) => {
    server.route([
      {
        method: 'GET',
        path: '/usuario',
        config: {
          auth: {
            scope: ['cliente', 'admin']
          },
          description: 'Listagem de Usuário',
          notes: 'Retornar uma lista de usuários cadastrados',
          tags: ['api'], // ADD THIS TAG
          handler: Controller.get,
        }
      }]);
  },
  name: 'usuario-public-route',
  version: '1.0.0'
};
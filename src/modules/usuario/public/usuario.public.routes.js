'use strict';

module.exports = {
  register: async (server) => {
    server.route([
      {
        method: 'GET',
        path: '/usuario',
        config: {
          description: 'Listagem de Usuário',
          notes: 'Retornar uma lista de usuários cadastrados',
          tags: ['api'], // ADD THIS TAG
          handler: async (request, response) => {
            const { Usuario } = request.database;
            return await Usuario.findAndCountAll();
          },
        }
      }, {
        method: 'POST',
        path: '/usuario',
        config: {
          description: 'Criação de Usuário',
          notes: 'Cria um usuário',
          tags: ['api'], // ADD THIS TAG
          handler: async (request, response) => {
            const { Usuario } = request.database;;
            return await Usuario.create(request.payload);
          },
        }
      }]);
  },
  name: 'usuario-public-route',
  version: '1.0.0'
};
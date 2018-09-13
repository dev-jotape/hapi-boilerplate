'use strict';

const Validator = require('./usuario.public.validation');
const Controller = require('./usuario.public.controller');

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
          handler: Controller.list,
        }
      }, 
      {
        method: 'GET',
        path: '/usuario/{id}',
        config: {
          description: 'GET Usuário por ID',
          notes: 'Retornar um usuário por ID',
          tags: ['api'], // ADD THIS TAG
          handler: Controller.get,
          validate: Validator.get()
        }
      },
      {
        method: 'POST',
        path: '/usuario',
        config: {
          description: 'Criação de Usuário',
          notes: 'Cria um usuário',
          tags: ['api'], // ADD THIS TAG
          handler: Controller.create,
          validate: Validator.create()
        }
      },
      {
        method: ['PUT', 'PATCH'],
        path: '/usuario/{id}',
        config: {
          description: 'Atualização de Usuário',
          notes: 'Atualiza um usuário',
          tags: ['api'], // ADD THIS TAG
          handler: Controller.update,
          validate: Validator.update()
        }
      },
      {
        method: ['DELETE'],
        path: '/usuario/{id}',
        config: {
          description: 'Exclusão de Usuário',
          notes: 'Exclui um usuário',
          tags: ['api'], // ADD THIS TAG
          handler: Controller.destroy,
          validate: Validator.get()
        }
      }]);
  },
  name: 'usuario-public-route',
  version: '1.0.0'
};
'use strict';

const Validator = require('./usuario.admin.validation');
const Controller = require('./usuario.admin.controller');

module.exports = {
  register: async (server) => {
    server.route([
      {
        method: 'GET',
        path: '/usuario/admin',
        config: {
          auth: {
            scope: ['admin']
          },
          handler: Controller.list,
        }
      },
      {
        method: 'GET',
        path: '/usuario/admin/{id}',
        config: {
          auth: {
            scope: ['admin']
          },
          handler: Controller.get,
          validate: Validator.get()
        }
      },
      {
        method: 'POST',
        path: '/usuario/admin',
        config: {
          auth: {
            scope: ['admin']
          },
          handler: Controller.create,
          validate: Validator.create()
        }
      },
      {
        method: ['PUT', 'PATCH'],
        path: '/usuario/admin/{id}',
        config: {
          auth: {
            scope: ['admin']
          },
          handler: Controller.update,
          validate: Validator.update()
        }
      },
      {
        method: ['DELETE'],
        path: '/usuario/admin/{id}',
        config: {
          auth: {
            scope: ['admin']
          },
          handler: Controller.destroy,
          validate: Validator.get()
        }
      }]);
  },
  name: 'usuario-admin-route',
  version: '1.0.0'
};
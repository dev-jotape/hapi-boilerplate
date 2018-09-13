'use strict';

const Pack = require('../../../package');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');

module.exports = {
  register: async (server) => {
    const swaggerOptions = {
      schemes: ['http'],
      host: 'localhost',
      info: {
        title: 'Hapi API',
        version: Pack.version,
      },
      swaggerUIPath: '/v1/',
      jsonPath: '/v1/swagger.json',
      documentationPath: '/v1/docs'
    };

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ]);
  },
  name: 'documentation',
  version: '1.0.0'
};
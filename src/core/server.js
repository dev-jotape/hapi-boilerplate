'use strict';

const Hapi = require('hapi');
const { getServer } = require('./utils/load');

const init = () => {
  const config = getServer();
  return new Hapi.Server({
    port: config.port,
    host: config.host,
    routes: {
      cors: {
        credentials: true
      }
    }
  });
};

module.exports = { init };
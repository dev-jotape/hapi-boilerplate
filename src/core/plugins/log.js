'use strict';

module.exports = {
  register: async (server) => {
    const options = {
      ops: {
        interval: 10000
      },
      includes: {
        request: ['headers', 'payload'],
        response: ['payload']
      },
      reporters: {
        console: [{
          module: 'good-console'
        }, 'stdout'],
        file: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ ops: '*', error: '*' }]
        }]
      }
    };

    await server.register({
      plugin: require('good'),
      options,
    });
  },
  name: 'log',
  version: '1.0.0'
};
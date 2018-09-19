'use strict';

module.exports = {
  register: async (server) => {
    await server.register(require('hapi-auth-jwt2'));

    const validate = async function (decoded, request) {
      const { Usuario } = request.database;

      const usuario = await Usuario.findOne({ where: {email: decoded.email} });

      if(!usuario) {
        return { isValid: false };
      }

      return { isValid: true };
      
    };

    server.auth.strategy('jwt', 'jwt', {
      key: 'goku',
      validate: validate,
      verifyOptions: {
        algorithms: ['HS256']
      }
    });

    server.auth.default({
      strategy: 'jwt',
      scope: ['admin']
    });
  },
  name: 'auth',
  version: '1.0.0'
};
'use strict';

module.exports = {
  async getToken (server) {
    const data = await server.inject({
      method: 'POST',
      url: '/v1/auth',
      payload: {
        email: 'jpsilva1206@gmail.com',
        senha: '2FmjrU3t'
      }
    });

    if (!data) throw new Error('Não foi possivel gerar token');
    return data.result.access_token;
  }
}
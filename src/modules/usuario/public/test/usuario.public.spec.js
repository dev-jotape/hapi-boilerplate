/* global describe, before, it, expect, server */

const factory = require('../../../../test/factory.usuario.spec');

describe('Usuário', () => {
  let token = null;

  before(async () => {
    token = await factory.getToken(server);
  });

  describe('Consulta', () => {
    it('Deve Retornar uma listagem de usuário', async () => {
      const response = await server.inject({
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`},
        url: '/v1/usuario'
      });

      expect(response.statusCode).to.equals(200);
    });
  });
});
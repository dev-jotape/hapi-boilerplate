/* global describe, before, it, expect, server */

const factory = require('../../../test/factory.usuario.spec');

describe('Usuário', () => {
  let token = null;

  describe('Auth', () => {
    it('Deve autenticar um usuário', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/auth',
        payload: {
          email: 'jpsilva1206@gmail.com',
          senha: '2FmjrU3t'
        }
      });

      expect(response.statusCode).to.equals(200);
    });

    it('Deve retornar um erro ao tentar autenticar um usuário com email inválido', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/auth',
        payload: {
          email: 'jpsilva12306@gmail.com',
          senha: '2FmjrU3t'
        }
      });

      expect(response.statusCode).to.equals(401);
    });

    it('Deve retornar um erro ao tentar autenticar um usuário com senha inválida', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/auth',
        payload: {
          email: 'jpsilva1206@gmail.com',
          senha: '2FmjrU32t'
        }
      });

      expect(response.statusCode).to.equals(401);
    });
  });
});

/* global describe, before, it, expect, server */

const factory = require('../../../../test/factory.usuario.spec');

describe('Usuário Admin', () => {
  let token = null;
  let id = null;

  before(async () => {
    token = await factory.getToken(server);
  });

  describe('Consulta', () => {
    it('Deve retornar uma lista de usuários', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/v1/usuario/admin',
        headers: { 'Authorization': `Bearer ${token}`}
      });
    
      expect(response.statusCode).to.equals(200);
      expect(response.result).to.exist();      
    });
    
    it('Deve retornar um usuário por ID', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/v1/usuario/admin/1',
        headers: { 'Authorization': `Bearer ${token}`}
      });
    
      expect(response.statusCode).to.equals(200);
      expect(response.result).to.exist();      
      expect(response.result.id).to.exist();      
      expect(response.result.id).to.equals('1');      
    });

    it('Deve retornar um erro ao tentar localizar um usuário por ID que não exista', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/v1/usuario/admin/2342343',
        headers: { 'Authorization': `Bearer ${token}`}
      });
    
      expect(response.statusCode).to.equals(404);
    });
    
    it('Deve criar um novo usuário', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/usuario/admin',
        headers: { 'Authorization': `Bearer ${token}`},
        payload: {
          email: 'usuario@teste.com',
          senha: 'senha@123'
        }
      });
    
      expect(response.statusCode).to.equals(201);
      expect(response.result).to.exist();      
      expect(response.result.id).to.exist();     
      
      id = response.result.id;
    });

    it('Deve retornar um erro ao tentar cadastrar o mesmo usuário novamente', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/usuario/admin',
        headers: { 'Authorization': `Bearer ${token}`},
        payload: {
          email: 'usuario@teste.com',
          senha: 'senha@123'
        }
      });
    
      expect(response.statusCode).to.equals(500);
    });
    
    it('Deve atualiza um usuário', async () => {
      const response = await server.inject({
        method: 'PUT',
        url: `/v1/usuario/admin/${id}`,
        headers: { 'Authorization': `Bearer ${token}`},
        payload: {
          nome: 'Teste'
        }
      });
    
      expect(response.statusCode).to.equals(200);
      expect(response.result).to.exist();      
      expect(response.result.id).to.exist();      
    });

    it('Deve retornar um erro ao tentar atualizar um usuário com ID inválido', async () => {
      const response = await server.inject({
        method: 'PUT',
        url: '/v1/usuario/admin/234234',
        headers: { 'Authorization': `Bearer ${token}`},
        payload: {
          nome: 'Teste'
        }
      });
    
      expect(response.statusCode).to.equals(404);
    });
    
    it('Deve deletar um usuário', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `/v1/usuario/admin/${id}`,
        headers: { 'Authorization': `Bearer ${token}`}
      });
    
      expect(response.statusCode).to.equals(200);
    });

    it('Deve retornar um erro ao tentar excluir um usuário com id inválido', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: '/v1/usuario/admin/234234',
        headers: { 'Authorization': `Bearer ${token}`}
      });
    
      expect(response.statusCode).to.equals(404);
    });
  });
});
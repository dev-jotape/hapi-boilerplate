'use strict';

const jwt = require('jsonwebtoken');

const generateToken = (usuario, expiresIn) => ({
  access_token: jwt.sign({
    id: usuario.id,
    email: usuario.email,
    scope: usuario.scope
  }, 'goku', { expiresIn: expiresIn }),
  email: usuario.email
});

const auth = async (request, reply) => {
  const { Usuario } = request.database;
  const payload = request.payload;

  const usuario = await Usuario.findOne({ where: {email: payload.email} });

  if(!usuario)  return reply.unauthorized('Email não cadastrado');
  if (!usuario.checarSenha(payload.senha)) return reply.unauthorized('Senha Inválida');

  let auth = {
    id: usuario.id,
    email: usuario.email,
    scope: usuario.acesso
  };
  
  return generateToken(auth, '1H');
};

module.exports = {
  auth
};
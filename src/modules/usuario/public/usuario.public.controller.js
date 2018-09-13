'use strict';

const list = async (request, response) => {
  const { Usuario } = request.database;
  return await Usuario.findAndCountAll();
};

const get = async (request, reply) => {
  const { Usuario } = request.database;
  const _usuario = await Usuario.findById(request.params.id);
  if (!_usuario) reply.badRequest('Usuário não localizado');
  return _usuario;
};

const create = async (request, response) => {
  const { Usuario } = request.database;
  return await Usuario.create(request.payload);
};

const update = async (request, reply) => {
  const { Usuario } = request.database;
  const _usuario = await Usuario.findById(request.params.id);
  if (!_usuario) reply.badRequest('Usuário não localizado');
  return await _usuario.update(request.payload);
};

const destroy = async (request, reply) => {
  const { Usuario } = request.database;
  const _usuario = await Usuario.findById(request.params.id);
  if (!_usuario) reply.badRequest('Usuário não localizado');
  return await _usuario.destroy();
};

module.exports = {
  list,
  get,
  create,
  update,
  destroy
};
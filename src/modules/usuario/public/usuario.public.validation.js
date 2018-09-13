'use strict';

const Joi = require('joi');
const { getSchema } = require('../usuario.schema');

const schema = getSchema();

const get = () => ({
  params: Joi.object({
    id: schema.id.required()
  })
});

const create = () => ({
  payload: Joi.object({
    nome: schema.nome.optional(),
    email: schema.email.required(),
    senha: schema.senha.required(),
  }).label('CadastroUsuario')
});

const update = () => ({
  params: Joi.object({
    id: schema.id.required()
  }),
  payload: Joi.object({
    nome: schema.nome.optional(),
    senha: schema.senha.optional(),
  }).label('UpdateUsuario')
});

module.exports = {
  get,
  create,
  update
};
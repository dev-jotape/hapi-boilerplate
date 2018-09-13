'use strict';

const Joi = require('joi');

const schema = {
  id: Joi.number().integer().min(0),
  nome: Joi.string().trim(),
  email: Joi.string().email(),
  senha: Joi.string().trim(),
  data_cadastro: Joi.date().iso(),
  data_atualizacao: Joi.date().iso()
};

const getSchema = () => (schema);

module.exports = {
  getSchema
};
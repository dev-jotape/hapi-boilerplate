'use strict';

const Joi = require('joi');

const schema = {
  email: Joi.string().email().trim(),
  senha: Joi.string().min(5).max(255).trim(),
};

const getSchema = () => (schema);

module.exports = {
  getSchema
};
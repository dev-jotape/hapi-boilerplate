'use strict';

const get = async (request, response) => {
  const credentials = request.auth.credentials;
  const { Usuario } = request.database;
  return await Usuario.findById(credentials.id);
};

module.exports = {
  get
};
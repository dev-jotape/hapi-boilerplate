'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const Sequelize = require('sequelize');

module.exports = {
  register: async (server, options) => {
    const sequelize = new Sequelize(options.database, options.username, options.password, {
      host: options.host,
      port: options.port,
      dialect: 'postgres'
    });

    const db = {};
    const dir = path.join(__dirname, '../../models');
    const models = await fs.readdirSync(dir);

    models.forEach((file) => {
      const model = sequelize.import(path.join(dir, file));
      db[model.name] = model;
    });

    return await server.decorate('request', 'database', _.extend({
      Sequelize,
      sequelize
    }, db));
  },
  name: 'database',
  version: '1.0.0'
};
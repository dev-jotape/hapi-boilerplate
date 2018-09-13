'use strict';

/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const Server = require('./server');
const { getDatabase } = require('./utils/load');
const { filterManualPlugins, filterCoreDirectories } = require('./utils/core-functions');

console.log(`Running enviroment ${process.env.NODE_ENV || 'dev'}`);

process.on('uncaughtException', (error) => {
  console.error(`uncaughtException ${error.message}`);
});

process.on('unhandledRejection', (error) => {
  console.error(`unhandledRejection ${error.message}`);
});

const start = async () => {
  try {
    const server = await Server.init();

    await corePlugins(server);
    await routePlugins(server);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(` ===> Error starting server: ${err}`);
    throw err;
  }
};

const corePlugins = async (server) => {
  console.log('===> load core plugins');
  try {
    const dir = path.join(__dirname, '/plugins');
    const plugins = fs.readdirSync(dir).filter(filterManualPlugins);

    let pluginsPromise = [];

    plugins.forEach((item) => {
      const plugin = require(path.join(dir, item));
      pluginsPromise.push(server.register(plugin));
    });

    pluginsPromise.push(server.register([
      { plugin: require('hapi-boom-decorators') },
      {
        plugin: require('./plugins/database'),
        options: getDatabase()
      }
    ]));

    return await Promise.all(pluginsPromise);
  } catch (err) {
    console.log(`error load core plugins: ${err}`);
    throw err;
  }
};

const routePlugins = async (server) => {
  console.log('===> load plugins routes');

  try {
    const dir = path.join(__dirname, '..');
    const routers = fs.readdirSync(dir).filter(filterCoreDirectories);

    let routersPromise = [];

    routers.forEach((item) => {
      const plugin = require(path.join(dir, item));
      routersPromise.push(server.register(plugin));
    });

    return await Promise.all(routersPromise);
  } catch (err) {
    console.log(`===> Error load plugins routes ${err}`);
  }
};

module.exports = { start };
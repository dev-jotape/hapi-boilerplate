'use strict';

const filterManualPlugins = (fileName) => !['database.js', 'auth.js'].some((item) => fileName === item);
const filterCoreDirectories = (dirName) => ((dirName === 'modules'));

module.exports = {
  filterManualPlugins,
  filterCoreDirectories
};

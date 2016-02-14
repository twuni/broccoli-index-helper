'use strict';

const merge = require('broccoli-merge-trees');
const indexPattern = /^(.+)\/([^\/]+)\.([^\.]+)$/g;

module.exports = function(fileName, moduleNames) {

  const indexName = fileName.replace(indexPattern, '$2');

  const modulePaths = moduleNames.map(function(moduleName) {
    return `./${indexName}/${moduleName}`;
  });

  const modules = modulePaths.map(require);

  return merge(modules);

};

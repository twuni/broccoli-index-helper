'use strict';

module.exports = function(options/*{fileName, indexName, pathFunction, moduleNames, modulePaths, modules} = {}*/) {

  if(typeof(options) !== 'object') {
    options = {};
  }

  let fileName = options.fileName;
  let indexName = options.indexName;
  let pathFunction = options.pathFunction;
  let moduleNames = options.moduleNames;
  let modulePaths = options.modulePaths;
  let modules = options.modules;

  if(typeof(modules) !== 'object') {

    if(typeof(modulePaths) !== 'object') {

      if(typeof(pathFunction) !== 'function') {

        if(typeof(fileName) === 'string') {
          const indexPattern = /^(.+)\/([^\/]+)\.([^\.]+)$/g;
          indexName = fileName.replace(indexPattern, '$1/$2');
        }

        if(typeof(indexName) !== 'string') {
          indexName = '.';
        }

        pathFunction = function(moduleName) {
          return `${indexName}/${moduleName}`;
        };

      }

      modulePaths = moduleNames.map(pathFunction);

    }

    modules = modulePaths.map(require);

  }

  const merge = require('broccoli-merge-trees');
  return merge(modules);

};

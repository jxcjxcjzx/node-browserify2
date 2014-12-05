'use strict';

var through = require('through2');
var mdeps = require('module-deps');
var _ = require('lodash');

var log = require('./logger');
var builtins = require('./builtins.js');

module.exports = function (vinyls) {
  var deps = mdeps();

  _.each(builtins, function (builtin) {
    log('Deps built-in module', builtin);
    deps.write({ file: builtin });
  });

  _.each(vinyls, function(vinyl) {
    log('Deps vinyl file', vinyl.path);
    deps.write({ file: vinyl.path });
  });

  deps.end();

  return deps.pipe(through.obj(function (json, encoding, done) {
    // hack to do NOT expose anything by default
    delete json.entry;
    delete json.expose;
    done(null, json);
  }));
};

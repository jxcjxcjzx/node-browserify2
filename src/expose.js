'use strict';

var through = require('through2');
var path = require('path');
var _ = require('lodash');

var log = require('./logger');
var builtins = require('./builtins.js');

// @params files is a dictionary. Key is key, value is module for require.
module.exports = function (files) {
  log('Expose files', files);

  // exposes = { filepath: exposed keys as string list }
  var exposes = _(files)
    .mapValues(resolveFile)
    .reduce(constructExposes, {});

  log('Expose lookup', exposes);

  return through.obj(function (json, encoding, done) {
    var expose = exposes[json.id] || exposes[json.file];
    if (expose) {
      log('Expose file %s as %s', json.file, expose);
      json.expose = expose;
    }

    done(null, json);
  });
};

function resolveFile(file) {
  try {
    // if it is a built-in module, resolve the shim path
    var bulitin = builtins[file];
    if (bulitin) {
      return bulitin;
    }

    // if it is a normal module, resolve module path
    return require.resolve(file);
  } catch (e) {
    // otherwise, resolve it as a file path
    return path.resolve(file);
  }
}

function constructExposes(result, expose, key) {
  var list = result[expose] || [];
  result[expose] = list.concat([key]);
  return result;
}

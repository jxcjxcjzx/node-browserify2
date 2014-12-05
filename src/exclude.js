'use strict';

var through = require('through2');
var path = require('path');
var _ = require('lodash');

var builtins = require('./builtins');
var log = require('./logger');

// @params files = { file path to exclude: excluded as key }
module.exports = function (files) {
  log('Exclude files', files);

  var excludes = _.reduce(files, constructExclude, {});

  log('Exclude lookup', excludes);

  return through.obj(function (json, encoding, done) {
    var exclude = excludes[json.id] || excludes[json.file];
    if (!exclude) {
      // update the JSON dependencies as outer references
      json.deps = _.mapValues(json.deps, function (dep) {
        var reference = excludes[dep];

        if (reference) {
          log('Exclude update %s dep from %s to %s', json.id, dep, reference);
        }

        return reference || dep;
      });

      this.push(json);
    } else {
      log('Exclude file %s as %s', json.file, exclude);
    }

    done();
  });
};

function constructExclude(results, reference, file) {
  file = resolveFile(file);
  results[file] = reference;
  return results;
}

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

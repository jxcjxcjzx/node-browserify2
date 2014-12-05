'use strict';

var through = require('through2');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var log = require('./logger');
var builtins = require('./builtins');

var prelude = fs.readFileSync(path.join(__dirname, './prelude.js'), 'utf8');

module.exports = function () {
  var first = true;
  var entries = {};

  return through.obj(function (row, encoding, done) {
    log('Pack file', row.id);

    if (first) {
      this.push(Buffer(prelude + '({'));
    }

    var wrappedSource = [
      (first ? '' : ','),
      '/*id*/' + JSON.stringify(row.id) + ':[',
      'function(require,module,exports,global){',
      '(function(process,Buffer,__filename,__dirname){',
      row.source + '}(',
      '/*process*/require(' + JSON.stringify(builtins.process) + '),',
      '/*buffer*/require(' + JSON.stringify(builtins.buffer) + ').Buffer,',
      '/*filename*/' + filename(row) + ',',
      '/*dirname*/' + dirname(row) + '))},',
      '/*deps*/' + JSON.stringify(row.deps || {}) + ']'
    ].join('\n');

    this.push(Buffer(wrappedSource));

    if (row.expose) {
      var ids = _.map(row.expose, function () {
        return row.id;
      });

      entries = _.assign(entries, _.zipObject(row.expose, ids));
    }

    first = false;

    done();

  }, function (done) {
    if (first) {
      // no row is provided
      this.push(Buffer(prelude + '({'));
    }

    log('Pack entries', JSON.stringify(entries));
    this.push(Buffer('},\n{},\n' + JSON.stringify(entries) + ')'));

    done();
  });
};

function filename(row) {
  return JSON.stringify(row.file);
}

function dirname(row) {
  return JSON.stringify(path.dirname(row.file));
}

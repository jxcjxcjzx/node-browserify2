'use strict';

var through = require('through2');
var File = require('vinyl');
var _ = require('lodash');

var log = require('./logger');
var createDeps = require('./deps');
var exclude = require('./exclude');
var expose = require('./expose');
var pack = require('./pack');
var exposeRequire = require('./expose-require');

module.exports = function (opts) {
  log('Bundle option', JSON.stringify(opts));

  opts = resolveOptions(opts);
  log('Bundle resolved option', JSON.stringify(opts));

  var vinyls = [];

  return through.obj(function (vinyl, encoding, done) {
    vinyls.push(vinyl);
    done();

  }, function (done) {
    log('Bundle files', JSON.stringify(vinyls.map(function (vinyl) {
      return vinyl.path;
    })));

    var stream = createDeps(vinyls)
      .pipe(exclude(opts.exclude))
      .pipe(expose(opts.expose))
      .pipe(pack())
      .pipe(exposeRequire(!_.isEmpty(opts.expose)));

    this.push(new File({
      path: opts.fileName,
      contents: stream
    }));

    done();
  });
};

function resolveOptions(opts) {
  if (typeof opts === 'string') {
    opts = {
      fileName: opts
    };
  }

  return _.assign({
    fileName: null,
    expose: {},
    exclude: []
  }, opts);
}

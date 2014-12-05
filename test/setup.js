/* jshint mocha: true */

'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

module.exports = setUp;
module.exports.combineSource = combineSource;
module.exports.wrapSource = wrapSource;
module.exports.evaluateSource = evaluateSource;

function setUp(opts) {
  opts = opts || {};

  var callerFile = getCallerFile();
  var basename = opts.basename || path.basename(callerFile);

  var context = {};
  var beforeExecute = opts.beforeEach ? beforeEach : before;

  beforeExecute('Evaluate source from ' + basename, function (done) {
    // clear previous context
    var keys = _.keys(context);
    _.each(keys, function (key) {
      delete context[key];
    });

    // context for runtime files
    context.__basename = basename;
    context.__testFile = callerFile;
    context.__buildFile = path.resolve(__dirname, '../build', basename);
    context.__fixtureFile = path.resolve(__dirname, '../fixture', basename);

    // context for global objects and functions
    context.Array = global.Array;
    context.Boolean = global.Boolean;
    context.Date = global.Date;
    context.Function = global.Function;
    context.Math = global.Math;
    context.Number = global.Number;
    context.Object = global.Object;
    context.RegExp = global.RegExp;
    context.String = global.String;
    context.TypeError = global.TypeError;
    context.parseInt = global.parseInt;

    // read build file and load it to context
    fs.readFile(context.__buildFile, {encoding: 'utf-8'}, function (err, source) {
      if (err) {
        throw err;
      }

      context.__buildSource = source;

      // wrap source in context, avoid global variables leak
      var wrappedSource = wrapSource(source);

      // eval the bundle file content and expose it to global
      context = evaluateSource(wrappedSource, context);

      done();
    });
  });

  return context;
}

function getCallerFile() {
  try {
    var err = new Error();
    var callerfile;
    var currentfile;

    Error.prepareStackTrace = function (err, stack) { return stack; };

    currentfile = err.stack.shift().getFileName();

    while (err.stack.length) {
      callerfile = err.stack.shift().getFileName();

      if(currentfile !== callerfile) return callerfile;
    }
  } catch (err) {}

  return undefined;
}

function combineSource() {
  return [].join.call(arguments, '; __require =');
}

function wrapSource(source) {
  return 'var window = arguments[0], require;' +
    'var __require =' + source + ';' +
    'window.__require = __require;' +
    'window.require = require';
}

function evaluateSource(source, context) {
  /* jshint -W061 */
  Function(source)(context);
  /* jshint +W061 */

  return context;
}

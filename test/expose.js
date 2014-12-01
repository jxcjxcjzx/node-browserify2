/* jshint mocha: true */

'use strict';

var fs = require('fs');
var path = require('path');
var expect = require('expect.js');
var React = require('react');

var bundleFilePath = path.resolve(__dirname, '../build/bundle.js');

before('read file content', function (done) {
  fs.readFile(bundleFilePath, {encoding: 'utf-8'}, function (err, data) {
    if (err) {
      throw err;
    }

    // eval the bundle file content and expose it to global
    /* jshint -W061 */
    Function(data)();
    /* jshint +W061 */

    done();
  });
});

describe('bundle', function () {
  it('should expose require function', function () {
    expect(global.require).to.be.a('function');
  });

  it('should has a way to access react module', function () {
    var _react = global.require('__index').react;
    expect(_react).to.be.an('object');
    expect(_react.version).to.equal(React.version);
  });

  it('should has a way to access test1 module', function () {
    var _test1 = global.require('__index').test1;
    expect(_test1).to.be.a('function');
    expect(_test1.displayName).to.be.a('string');

    // TODO [facebook/react#2374] there is not a good way to validate a React class
  });

  it('should has a way to access test2 module', function () {
    var _test2 = global.require('__index').test2;
    expect(_test2).to.be.a('function');
    expect(_test2.displayName).to.be.a('string');
  });

  it('should has a way to access test3 module', function () {
    var _test3 = global.require('__index').test3;
    expect(_test3).to.be.a('function');
    expect(_test3.displayName).to.be.a('string');
  });
});

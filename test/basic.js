/* jshint mocha: true */

'use strict';

var expect = require('expect.js');
var builtins = require('../src/builtins');

var context = require('./setup')();

describe('basic bundle', function () {
  it('should not expose require', function () {
    expect(context.require).to.be(undefined);
    expect(context.__require).to.be.a('function');
  });

  it('should acquire basic module', function () {
    var basicModule = context.__require(context.__fixtureFile);
    expect(basicModule).to.be.a('function');

    var message = basicModule();
    expect(message).to.be.a('string');
    expect(message).to.not.be.empty();
  });

  it('should always expose the built-in modules', function () {
    var utilFilePath = builtins.util;
    var utilModule = context.__require(utilFilePath);
    expect(utilModule).to.be.an('object');
  });
});

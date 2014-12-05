/* jshint mocha: true */

'use strict';

var path = require('path');
var expect = require('expect.js');

var context = require('./setup')();

describe('dependency bundle', function () {
  it('should acquire dependency module', function () {
    var depModule = context.__require(context.__fixtureFile);
    expect(depModule).to.be.a('function');

    var message = depModule();
    expect(message).to.be.a('string');
    expect(message).to.not.be.empty();
  });

  it('should dependent on basic module', function () {
    var basicFilePath = path.resolve(__dirname, '../fixture/basic.js');
    var basicModule = context.__require(basicFilePath);
    expect(basicModule).to.be.a('function');
  });
});

/* jshint mocha: true */

'use strict';

var expect = require('expect.js');

var context = require('./setup')();

describe('expose bundle', function () {
  it('should expose require function', function () {
    expect(context.require).to.be.a('function').and.equal(context.__require);
  });

  it('should acquire expose module via require function', function () {
    var exposeModule = context.require('exposeIt');
    expect(exposeModule).to.be.a('function');

    var message = exposeModule();
    expect(message).to.be.a('string').and.not.be.empty();
  });
});

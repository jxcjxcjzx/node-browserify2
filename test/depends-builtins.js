/* jshint mocha: true */

'use strict';

var expect = require('expect.js');

var context = require('./setup')();

describe('built-in bundle', function () {
  it('should expose the built-in module', function () {
    var bulitinModule = context.__require(context.__fixtureFile);
    expect(bulitinModule).to.be.a('function');

    var message = bulitinModule();
    expect(message).to.be.a('string');
    expect(message).to.not.be.empty();
  });
});

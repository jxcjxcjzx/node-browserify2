/* jshint mocha:true */

'use strict';

var expect = require('expect.js');
var lodash = require('lodash');
var setUp = require('./setup');

var context = setUp();
var previousContext = setUp({ basename: 'expose-npm-package.js' });

before('Combine new bundle after previous bundle', function () {
  var source = setUp.combineSource(previousContext.__buildSource, context.__buildSource);
  var wrappedSource = setUp.wrapSource(source);

  // evaluate combined source to context
  context = setUp.evaluateSource(wrappedSource, context);
});

describe('Require chains module', function () {
  it('should expose two entries point to same object', function () {
    var entry = context.require('entry');
    var main = context.require('entry');

    expect(entry).to.equal(main);
  });

  it('should still acquire previous exposed module', function () {
    var _ = context.require('_');
    expect(_).to.be.a('function').and.have.key('VERSION');
    expect(_.VERSION).to.equal(lodash.VERSION);
  });

  it('should override previous same name exposed module', function () {
    var previousMessage = require(previousContext.__fixtureFile)();
    var currentMessage = require(context.__fixtureFile)();

    var entry = context.require('entry');
    expect(entry).to.be.a('function');

    var message = entry();
    expect(message).to.equal(currentMessage).and.not.equal(previousMessage);
  });
});

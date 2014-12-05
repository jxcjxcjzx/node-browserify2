/* jshint mocha:true */

'use strict';

var expect = require('expect.js');
var setUp = require('./setup');

var outerContext = setUp({ basename: 'expose-module.js' });

describe('exclude-module', function () {
  var context = setUp({ beforeEach: true });

  it('should throw exception when load bundle directly', function () {
    context.__sameContext = true;
    expect(context.__sameContext).to.be(true);

    var requireExposeIt = context.__require.bind(context, 'exposeIt');
    var requireFixture = context.__require.bind(context, context.__fixtureFile);

    expect(requireExposeIt).to.throwException();
    expect(requireFixture).to.throwException();
  });

  it('should refer exposeIt after with exposed context', function () {
    // avoid previous context affects this test case
    expect(context.__sameContext).to.not.be(true);

    var source = setUp.combineSource(outerContext.__buildSource, context.__buildSource);
    var wrappedSource = setUp.wrapSource(source);

    context = setUp.evaluateSource(wrappedSource, context);

    var requireExposeIt = context.require.bind(context, 'exposeIt');
    var requireFixture = context.__require.bind(context, context.__fixtureFile);
    requireFixture();
    expect(requireExposeIt).not.to.throwException();
    expect(requireFixture).not.to.throwException();

    var expectedMessage = require(context.__fixtureFile)();
    var actualMessage = requireFixture()();
    expect(actualMessage).to.equal(expectedMessage);
  });
});

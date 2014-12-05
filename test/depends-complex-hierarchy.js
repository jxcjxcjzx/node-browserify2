/* jshint mocha: true */

'use strict';

var path = require('path');
var expect = require('expect.js');

var context = require('./setup')();

describe('depends bundle', function () {
  it('should acquire inner module directly', function () {
    var file = path.resolve(__dirname, '../fixture/depends/dep1.js');
    var dep1 = context.__require(file);
    expect(dep1).to.be.a('function');

    var result = dep1();
    expect(result).to.be('[dep1]');
  });

  it('should works with inner module from two entries', function () {
    var deps = context.__require(context.__fixtureFile);
    expect(deps).to.be.a('function');

    var results = deps().split('\n');
    expect(results.length).to.be(2);
    expect(results[0]).to.contain('[dep1]');
    expect(results[1]).to.contain('[dep1]');
  });
});

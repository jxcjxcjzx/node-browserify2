/* jshint mocha: true */

'use strict';

var expect = require('expect.js');
var context = require('./setup')();

describe('Expose module with two names', function () {
  it('should expose module with three different names', function () {
    var entry = context.require('entry');
    var main = context.require('main');
    var exposed = context.require('exposed');

    expect(entry).to.equal(main).and.to.equal(exposed);
  });

  it('should expose built-in module with two different names', function () {
    var util = context.require('util');
    var helper = context.require('helper');

    expect(util).to.equal(helper);
  });
});

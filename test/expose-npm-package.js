/* jshint mocha: true */

'use strict';

var expect = require('expect.js');
var lodash = require('lodash');

var context = require('./setup')();

describe('expose-lodash bundle', function () {
  it('should expose lodash module', function () {
    var _ = context.require('_');
    expect(_).to.be.a('function').and.to.have.key('map', 'reduce', 'VERSION');
    expect(_.VERSION).to.equal(lodash.VERSION);
  });
});

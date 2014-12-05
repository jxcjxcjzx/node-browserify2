/* jshint mocha:true */

'use strict';

var expect = require('expect.js');

var context = require('./setup')();

describe('expose-builtin bundle', function () {
  it('should expose built-in modules', function () {
    var util = context.require('util');
    expect(util).to.be.an('object').and.have.property('format');
    expect(util.format).to.be.a('function');

    var process = context.require('process');
    expect(process).to.be.an('object').and.have.property('title');
    expect(process.title).to.be.a('string').and.not.be.empty();
  });
});

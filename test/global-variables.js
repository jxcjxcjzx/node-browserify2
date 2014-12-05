/* jshint mocha: true */

'use strict';

var expect = require('expect.js');

var context = require('./setup')();

describe('global bundle', function () {
  it('should works with node global variables', function () {
    var messages = context.__require(context.__fixtureFile)();
    expect(messages).to.be.an('object');

    expect(messages.filename).to.be.a('string').and.not.be.empty();
    expect(messages.dirname).to.be.a('string').and.not.be.empty();

    expect(messages.process).to.be.an('object').and.not.be.empty();
    expect(messages.process.title).to.be.a('string').and.not.be.empty();

    expect(messages.buffer).to.be.an('object').and.have.property('length');
    expect(messages.buffer.toString()).to.be.a('string').and.not.be.empty();

    expect(context).to.have.property('globalValue');
    expect(context.globalValue).to.be.a('string').and.not.be.empty();
  });
});

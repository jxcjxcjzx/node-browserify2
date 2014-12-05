'use strict';

var through = require('through2');
var log = require('./logger');

module.exports = function (expose) {
  var first = true;
  return through(function (chunk, encoding, done) {
    if (first && expose) {
      log('Expose `require` function as global variable');

      this.push('require=');
    }

    first = false;
    done(null, chunk);
  });
};

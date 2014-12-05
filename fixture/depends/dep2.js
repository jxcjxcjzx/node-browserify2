'use strict';

var dep1 = require('./dep1.js');

module.exports = function () {
  return '[dep2] -> ' + dep1();
};

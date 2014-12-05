'use strict';

var dep1 = require('./depends/dep1.js');
var dep2 = require('./depends/dep2.js');

module.exports = function () {
  return '[complex] -> ' + dep1() + '\n' + '[complex] -> ' + dep2();
};

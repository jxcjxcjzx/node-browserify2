'use strict';

var exposed = require('./expose-module');

module.exports = function () {
  return 'this module depends on a module will be excluded soon. ' + exposed();
};

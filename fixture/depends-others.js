'use strict';

var basic = require('./basic.js');

module.exports = function () {
  var message = basic();
  return 'Dependent mesage: ' + message;
};

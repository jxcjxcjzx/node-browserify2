'use strict';

var util = require('util');

module.exports = function () {
  var date = new Date();
  var message = util.format('Current date time: %s', date);
  return message;
};

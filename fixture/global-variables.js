'use strict';

module.exports = function () {
  var messages = {};

  messages.filename = __filename;
  messages.dirname = __dirname;
  messages.process = process;
  messages.buffer = Buffer('this is a buffer');

  global.globalValue = 'this variable is set from global.js';

  return messages;
};

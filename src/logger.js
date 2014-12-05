'use strict';

var debug = process.env.DEBUG;

module.exports = function () {
  if (debug) {
    console.log.apply(console.log, arguments);
  }
};

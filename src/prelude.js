
/* jshint unused:true, -W030, -W033 */
/* global window */
/* exported */

// modules are defined as an array
// [ module function, map of requireuires ]
//
// map of requireuires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the requireuire for previous bundles

(function outer (modules, cache, entries) {
  'use strict';

  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require == "function" && require;

  function newRequire(name, jumped){
    if(!cache[name]) {
      if(!modules[name]) {
        // if we cannot find the the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require == "function" && require;
        if (!jumped && currentRequire) return currentRequire(name, true);

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) return previousRequire(name, true);
        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      var target = modules[name][0];
      var deps = modules[name][1];

      var r = function (id) {
        // if not in deps list, it might be a global variales, i.e., process
        return newRequire(deps[id] || id);
      };

      var m = cache[name] = {
        exports: {}
      };

      target.call(m.exports,
        /* require */ r,
        /* module  */ m,
        /* exports */ m.exports,
        /* global  */ window);
    }

    return cache[name].exports;
  }

  // evalute entries on page load for cache and error check
  var entriesIsObject = !(entries instanceof Array);

  for(var key in entries) {
    var entry = entries[key];
    newRequire(entry);

    if (entriesIsObject) {
      // when entries is an object, expose the entry key too
      cache[key] = cache[entry];
    }
  }

  // Override the current require with this new one
  return newRequire;
})

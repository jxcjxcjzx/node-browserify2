/* jshint mocha: true */

'use strict';

var fs = require('fs');
var path = require('path');

var bundleFilePath = path.resolve(__dirname, '../build/bundle.js');
var bundleFileContent;

before('read file content', function (done) {
  fs.readFile(bundleFilePath, {encoding: 'utf-8'}, function (err, data) {
    if (err) {
      throw err;
    }

    bundleFileContent = data;
    done();
  });
});

describe('bundle', function () {
  it('should expose require function', function () {
    //console.log(bundleFileContent.substr(0, 30) + '...');
  });

  it('should has a way to access react module', function () {
    //console.log(bundleFileContent.substr(0, 30) + '... (react)');
  });

  it('should has a way to access test1 module', function () {
    //console.log(bundleFileContent.substr(0, 30) + '... (test1)');
  });

  it('should has a way to access test2 module', function () {
    //console.log(bundleFileContent.substr(0, 30) + '... (test2)');
  });

  it('should has a way to access test3 module', function () {
    //console.log(bundleFileContent.substr(0, 30) + '... (test3)');
  });
});

'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var browserify = require('browserify');
var reactify = require('reactify');
var File = require('vinyl');
var source = require('vinyl-source-stream');
var path = require('path');

var buildPath = './build/';
var indexFileName = '__index.js';

var files = {
  'test1': './test1.jsx',
  'test2': './test2.jsx'
};

gulp.task('index', function () {
  var indexContent = _.map(files, function (file) {
    return 'require(\'' + path.resolve(file) + '\');';
  }).join('\n');

  var indexFile = new File({
    contents: new Buffer(indexContent)
  });

  return indexFile
    .pipe(source(indexFileName))
    .pipe(gulp.dest(buildPath));
});

gulp.task('default', ['index'], function () {
  var indexFilePath = path.resolve(buildPath, indexFileName);
  var opts = {
    debug: true
  };

  browserify(indexFilePath, opts)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(buildPath));
});

'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var browserify = require('browserify');
var reactify = require('reactify');
var File = require('vinyl');
var source = require('vinyl-source-stream');

var dest = gulp.dest('./build/');

var files = {
  'test1': './test1.jsx',
  'test2': './test2.jsx'
};

gulp.task('index', function () {
  var indexContent = _.map(files, function (file) {
    return 'require(\'' + file + '\');';
  }).join('\n');

  var indexFile = new File({
    contents: new Buffer(indexContent)
  });

  indexFile.pipe(source('index.js'))
    .pipe(dest);
});

gulp.task('default', function () {
  var bd = browserify({
    debug: true
  });

  bd.require('react');
  bd.require('./test1.jsx', {expose: 'test1'});

  bd.transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(dest);
});

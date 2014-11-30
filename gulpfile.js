'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', function () {
  var bd = browserify('./test1.js');

  bd.require('react');
  bd.require('./test1.js', {expose: 'test1'});

  bd.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
});

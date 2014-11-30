'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('default', function () {
  var bd = browserify({
    debug: true
  });

  bd.require('react');
  bd.require('./test1.jsx', {expose: 'test1'});

  bd.transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
});

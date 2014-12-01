'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var browserify = require('browserify');
var reactify = require('reactify');
var File = require('vinyl');
var source = require('vinyl-source-stream');
var path = require('path');
var del = require('del');
var mocha = require('gulp-mocha');

var buildPath = './build/';
var indexFileName = '__index.js';

var files = {
  'react': 'react',
  'test1': './test1.jsx',
  'test2': './test2.jsx',
  'test3': './folder1/test3.jsx'
};

gulp.task('clean', function (done) {
  del([buildPath + '/*.js'], function (err) {
    if (err) {
      throw err;
    }

    done();
  });
});

gulp.task('index', ['clean'], function () {
  var indexContent = 'module.exports = {\n';

  indexContent += _.map(files, function (file, alias) {
    // path.resolve expose the real path for the user
    var p = (file[0] === '.') ? ('../' + file) : file;
    return '  ' + alias + ': require(\'' + p + '\')';
  }).join(',\n');

  indexContent += '\n};';

  var indexFile = new File({
    contents: new Buffer(indexContent)
  });

  return indexFile
    .pipe(source(indexFileName))
    .pipe(gulp.dest(buildPath));
});

gulp.task('browserify', ['index'], function () {
  var bd = browserify({
    debug: true
  });

  bd.require(path.resolve(buildPath, indexFileName), {expose: '__index'});

  return bd.transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(buildPath));
});

gulp.task('test', ['browserify'], function () {
  return gulp.src('./test/*.js', {read: false})
    .pipe(mocha({reporter: 'min'}));
});

gulp.task('default', ['browserify', 'test'], function () {
});

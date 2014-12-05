'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var fs = require('fs');
var del = require('del');
var mocha = require('gulp-mocha');
var bundle = require('./');

var buildPath = './build/';

gulp.task('clean', function (done) {
  del([buildPath + '/*.js'], function (err) {
    if (err) {
      throw err;
    }

    done();
  });
});

var tests = [
  'basic',
  'depends-others',
  'depends-builtins',
  'depends-complex-hierarchy',
  'global-variables',
  {
    target: 'expose-module',
    fileName: 'expose-module.js',
    expose: {
      'exposeIt': './fixture/expose-module.js'
    }
  },
  {
    target: 'expose-npm-package',
    fileName: 'expose-npm-package.js',
    expose: {
      'entry': './fixture/expose-npm-package.js',
      '_': 'lodash'
    }
  },
  {
    target: 'expose-builtins',
    fileName: 'expose-builtins.js',
    expose: {
      'process': 'process',
      'util': 'util'
    }
  },
  {
    target: 'expose-module-with-two-names',
    fileName: 'expose-module-with-two-names.js',
    expose: {
      'entry': './fixture/expose-module-with-two-names.js',
      'main': './fixture/expose-module-with-two-names.js',
      'exposed': './fixture/expose-module-with-two-names.js',
      'util': 'util',
      'helper': 'util'
    }
  },
  {
    target: 'require-chains',
    fileName: 'require-chains.js',
    expose: {
      'main': './fixture/require-chains.js',
      'entry': './fixture/require-chains.js'
    },
    deps: ['expose-npm-package']
  },
  {
    target: 'exclude-module',
    fileName: 'exclude-module.js',
    exclude: {
      './fixture/expose-module.js': 'exposeIt'
    },
    deps: ['expose-module']
  },
];

_.each(tests, function (test) {
  // for each test case, there should a JavaScript file in fixture folder,
  // then generate the corresponding file in build folder,
  // and last, run unit test file with same name in test folder.

  var target = _.isObject(test) ? test.target : test;
  var sourceFile = './fixture/' + target + '.js';
  var testFile = './test/' + target + '.js';

  var checkFixtureTask = 'check-fixture-' + target;
  var checkTestTask = 'check-test-' + target;
  var buildTask = 'build-' + target;
  var testTask = 'test-' + target;

  var deps = _.map(_.isObject(test) && test.deps || [], function (dep) {
    return 'build-' + dep;
  });

  function checkIfFileExists(file) {
    return function (done) {
      fs.open(file, 'r', function (err) {
        if (err) {
          throw err;
        }

        done();
      });
    };
  }

  gulp.task(checkFixtureTask, ['clean'], checkIfFileExists(sourceFile));

  gulp.task(checkTestTask, ['clean'], checkIfFileExists(testFile));

  gulp.task(buildTask, [checkFixtureTask].concat(deps), function () {
    return gulp.src(sourceFile)
      .pipe(bundle(_.isObject(test) ? test : target + '.js'))
      .pipe(gulp.dest(buildPath));
  });

  gulp.task(testTask, [buildTask, checkTestTask], function () {
    return gulp.src(testFile, {read: false})
      .pipe(mocha({reporter: 'mocha-silent-reporter'}));
  });
});

gulp.task('test', tests.map(function (test) {
  var target = _.isObject(test) ? test.target : test;
  return 'test-' + target;
}));

gulp.task('build', ['clean'], function () {
  console.log('TODO: that is nothing to build');
});

gulp.task('default', ['build', 'test']);

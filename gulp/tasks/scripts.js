'use strict';
const annotate = require('gulp-ng-annotate');
const babel = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const handleError = require('../error');
const path = require('path');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const taskName = 'scripts';

// TASK: scripts
// Use browserify to generate a single JS file that contains
// all required javascript code hit within our custom code.
// Produces a non-minified and minified version with .min suffix
module.exports = function (config) {
  gulp.task(taskName, function (done) {
    let remaining = config.bundles.length;
    config.bundles.forEach(function (bundle) {
      const output = ['app', bundle].join('.');
      browserify({
        entries: [path.join(config.dirs.scripts.src, bundle)],
        debug: true
      })
      .transform(babel, { presets: ['es2015'] })
      .bundle()
      .on('error', handleError)
      .pipe(plumber({ errorHandler: handleError }))
      .pipe(source(output))
      .pipe(annotate())
      .pipe(gulp.dest(config.dirs.scripts.dest))
      .pipe(buffer())
      .pipe(gulpIf(gulp.isProduction,
        uglify({
          mangle: true,
          compress: true,
          preserveComments: false
        })))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(config.dirs.scripts.dest))
      .on('finish', function () { // eslint-disable-line consistent-return
        if (--remaining === 0) {
          return done();
        }
      });
    });
  });
  return taskName;
};

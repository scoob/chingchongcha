const autoprefixer = require('gulp-autoprefixer');
const bless = require('gulp-bless');
const gulp = require('gulp');
const handleError = require('../error');
const minify = require('gulp-minify-css');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const taskName = 'stylesheets';

// TASK: stylesheets
// Compile all base SASS fles into respecitve CSS files.
// Produces a non-minified and minified version with .min suffix
module.exports = function (config) {
  // Compile SCSS into CSS stylesheet
  gulp.task(taskName, function () {
    return gulp.src(config.files.stylesheets)
      .pipe(plumber({ errorHandler: handleError }))
      .pipe(sass())
      .pipe(autoprefixer('last 3 version', '> 1%'))
      .pipe(gulp.dest(config.dirs.stylesheets.dest))
      .pipe(minify({
        processImport: false,
        shorthandCompacting: false
      }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(bless())
      .pipe(gulp.dest(config.dirs.stylesheets.dest));
  });
  return taskName;
};

const gulp = require('gulp');
const handleError = require('../error');
const modernizr = require('gulp-modernizr');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const taskName = 'modernizr';

// TASK: modernizr
// Generate a custom modernizr script that features only
// the tests referenced by the compiled css and javascript
// to ensure a minimum viable filesize
module.exports = function (config) {
  gulp.task(taskName, function () {
    return gulp.src([config.dirs.scripts.dest + '/all.js',
                     config.dirs.stylesheets.dest + '/*.css'])
      .pipe(plumber({ errorHandler: handleError }))
      .pipe(modernizr({
        excludeTests: ['hidden'],
        options: ['setClasses', 'html5printshiv', 'fnBind']
      }))
      .pipe(uglify({
        mangle: true,
        compress: true,
        preserveComments: false
      }))
      .pipe(rename({ suffix: '-custom.min' }))
      .pipe(gulp.dest(config.dirs.scripts.dest));
  });
  return taskName;
};

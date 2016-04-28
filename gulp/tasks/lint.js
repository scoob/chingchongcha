const gulp = require('gulp');
const eslint = require('gulp-eslint');
const taskName = 'lint';

// TASK: lint
// Run linting with jshint across all JavaScript files to look
// for possibly invalid code including missing ; and undefined variables
module.exports = function (config) {
  gulp.task(taskName, function () {
    return gulp.src(config.files.scripts)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
  });
  return taskName;
};

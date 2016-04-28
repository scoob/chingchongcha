const gulp = require('gulp');
const taskName = 'images';

// TASK: images
// Optimizes and moves the images directory
module.exports = function (config) {
  gulp.task(taskName, function () {
    return gulp.src(config.files.images)
      .pipe(gulp.dest(config.dirs.images.dest));
  });
  return taskName;
};

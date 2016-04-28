const del = require('del');
const gulp = require('gulp');
const taskName = 'clean';

// TASK: clean
// Deletes all compiled assets from the working public directory.
module.exports = function (config) {
  // The following files will be removed during a
  // clean task. This contains all gulp compiled files
  const distPaths = [
    config.dirs.images.dest,
    config.dirs.scripts.dest,
    config.dirs.stylesheets.dest
  ];
  gulp.task(taskName, function (done) {
    return del(distPaths, { force: true }, done);
  });
  return taskName;
};

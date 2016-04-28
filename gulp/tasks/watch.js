const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence').use(gulp);
const server = require('../server');
const taskName = 'watch';

// TASK: watch
// Watch all files that are used to generate a static asset.
// When a change is made recompile the minimum files required.
module.exports = function (config) {
  const lint = require('./lint')(config);
  const scripts = require('./scripts')(config);
  const stylesheets = require('./stylesheets')(config);
  gulp.task(taskName, function () {
    gulp.isWatching = true;
    gulp.watch(config.files.scripts, function () {
      runSequence(lint, scripts, server.reload);
    });
    gulp.watch(path.join(config.dirs.stylesheets.src, '**/*.scss'), function () {
      runSequence(stylesheets, server.reload);
    });
  });
  return taskName;
};

'use strict';
const gulp = require('gulp');
const karma = require('karma').Server;
const taskName = 'test';

/**
 * Run test once and exit
 */
module.exports = function () {
  gulp.task(taskName, function (done) {
    karma.start({
      configFile: './karma.conf.js',
      singleRun: false
    }, done);
  });
  return taskName;
};

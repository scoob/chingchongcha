/**
 * Gulp build
 *
 * Build process for developing a SASS + Angular/JS web application.
 * Default build for development will watch and recompile, with debug
 * information on each change of local styleheets + javascript files.
 *
 * For usage information see README.md for this project.
 */
const config = require('./gulp/config');
const gulp = require('gulp');
const runSequence = require('run-sequence').use(gulp);

// Custom subtasks defined for this project
const stylesheets = require('./gulp/tasks/stylesheets')(config);
const modernizr = require('./gulp/tasks/modernizr')(config);
const lint = require('./gulp/tasks/lint')(config);
const scripts = require('./gulp/tasks/scripts')(config);
const clean = require('./gulp/tasks/clean')(config);
const images = require('./gulp/tasks/images')(config);

// Clean and compile all static assets with static analysis warnings
gulp.task('development', function (callback) {
  runSequence(clean, lint, [scripts, stylesheets, images], [modernizr], callback);
});

// Clean and compile all static assets
gulp.task('production', function (callback) {
  gulp.isProduction = true;
  runSequence(clean, [scripts, stylesheets, images], [modernizr], callback);
});

// Run development task and locally run a static server with compiled assets
gulp.task('default', function (callback) {
  runSequence('development', callback);
});

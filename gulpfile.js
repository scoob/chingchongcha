const gulp = require('gulp');
const rimraf = require('rimraf');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const bless = require('gulp-bless');
const minify = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const dnx = require('gulp-dnx');

const webroot = './wwwroot/';

const paths = {
  js: webroot + 'js/**/*.js',
  minJs: webroot + 'js/**/*.min.js',
  css: webroot + 'css/**/*.css',
  images: 'images/*',
  scss: 'stylesheets/*.scss',
  sassDest: webroot + 'css',
  cssDest: webroot + 'css',
  minCss: webroot + "css/**/*.min.css",
  concatJsDest: webroot + "js/site.min.js",
  concatCssDest: webroot + "css/styles.min.css",
  imageDest: webroot + "images"
};

gulp.task("clean:js", function (cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
  rimraf(paths.concatCssDest, cb);
});

gulp.task("clean:images", function (cb) {
  rimraf(paths.imageDest, cb);
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.imageDest));
});

gulp.task('sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(autoprefixer('last 3 version', '> 1%'))
    .pipe(gulp.dest(paths.sassDest))
    .pipe(minify({
        processImport: false,
        shorthandCompacting: false
      }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(bless())
    .pipe(gulp.dest(paths.cssDest));
});

gulp.task("clean", ["clean:js", "clean:css", "clean:images"]);

gulp.task("min:js", function () {
  return gulp.src([paths.js, "!" + paths.minJs], {
    base: "."
  })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "sass", "images"]);

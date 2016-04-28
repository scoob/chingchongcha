/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  sass = require("gulp-sass"),
  bless = require("gulp-bless"),
  minify = require("gulp-minify"),
  autoprefixer = require("gulp-autoprefixer"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename");

var webroot = "./wwwroot/";

var paths = {
  js: webroot + "js/**/*.js",
  minJs: webroot + "js/**/*.min.js",
  css: webroot + "css/**/*.css",
  scss: "Stylesheets/*.scss",
  sassDest: webroot + "css",
  cssDest: webroot + "css",
  minCss: webroot + "css/**/*.min.css",
  concatJsDest: webroot + "js/site.min.js"
};

gulp.task("clean:js", function (cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
  rimraf(paths.concatCssDest, cb);
});

gulp.task('images', function () {
  return gulp.src(config.files.images)
    .pipe(gulp.dest(config.dirs.images.dest));
});

gulp.task('sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(autoprefixer('last 3 version', '> 1%'))
    .pipe(gulp.dest(paths.sassDest))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(bless())
    .pipe(gulp.dest(paths.cssDest));
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
  return gulp.src([paths.js, "!" + paths.minJs], {
    base: "."
  })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
  return gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "sass"]);

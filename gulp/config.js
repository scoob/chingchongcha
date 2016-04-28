const path = require('path');

// Configuration for static asset generation.
// This object is used to specify the directory and files
// that each task can use when looking for compile-ready assets

const dirs = {
  images: {
    src: path.join(__dirname, '../app/images'),
    dest: path.join(__dirname, '../wwwroot/images')
  },
  scripts: {
    src: path.join(__dirname, '../app/scripts'),
    dest: path.join(__dirname, '../wwwroot/scripts'),
  },
  stylesheets: {
    src: path.join(__dirname, '../app/stylesheets'),
    dest: path.join(__dirname, '../wwwroot/stylesheets')
  }
};

const files = {
  images: [
    dirs.images.src + '/*'
  ],
  stylesheets: [
    dirs.stylesheets.src + '/*.scss'
  ],
  scripts: [
    dirs.scripts.src + '/**/*.js',
    '../gulp/**/*.js',
    dirs.scripts.src + '/**/*.js',
    '!' + dirs.scripts.src + '**/modernizr*.min.js',
    '!' + dirs.scripts.src + '/**/app.*.js'
  ]
};

module.exports = {
  dirs,
  files,
  bundles: ['index.js'],
};

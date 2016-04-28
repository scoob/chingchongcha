const browserSync = require('browser-sync').create();

// Returns a single instance of BrowserSync that is
// used across this entire gulp build process.
module.exports = browserSync;

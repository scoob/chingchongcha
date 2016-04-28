const notify = require('gulp-notify');

// Handle Gulp errors gracefully during a watch task.
// When an error occurs in some gulp task (e.g. sass)
// present the user with an error via OS level tools
// (e.g. OS notifications or Growl) and allow the
// watch to continue with fixes.
module.exports = function (error) {
  notify.onError({
    title: error.name,
    message: error.message,
    sound: 'Beep'
  })(error);
  this.emit('end');
};

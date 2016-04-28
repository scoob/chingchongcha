const angular = require('angular');

angular.module('app', [])
.controller('AppController', function () {
  const controller = this;
  controller.test = 'Hello';
});

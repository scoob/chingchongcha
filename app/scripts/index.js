const angular = require('angular');
const round = require('./round');
const scoreboard = require('./scoreboard');
const ngStorage = 'ngStorage'; require('ngstorage');

angular.module('app', [
  ngStorage,
  round,
  scoreboard
])
.controller('AppController', function () {
  const controller = this;
  controller.test = 'Hello';
});

const angular = require('angular');
const mode = require('./mode');
const round = require('./round');
const scoreboard = require('./scoreboard');
const ngStorage = 'ngStorage'; require('ngstorage');

angular.module('app', [
  ngStorage,
  mode,
  round,
  scoreboard
])
.controller('AppController', function () {
  const controller = this;
  controller.test = 'Hello';
});

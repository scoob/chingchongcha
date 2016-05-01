const angular = require('angular');
const countdown = require('./countdown');
const game = require('./game');
const mode = require('./mode');
const result = require('./result');
const scoreboard = require('./scoreboard');
const ngStorage = 'ngStorage'; require('ngstorage');

angular.module('app', [
  ngStorage,
  countdown,
  game,
  mode,
  result,
  scoreboard
])
.controller('AppController', function () {});

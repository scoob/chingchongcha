const angular = require('angular');
const game = require('./game');
const mode = require('./mode');
const result = require('./result');
const scoreboard = require('./scoreboard');
const ngStorage = 'ngStorage'; require('ngstorage');

angular.module('app', [
  ngStorage,
  game,
  mode,
  result,
  scoreboard
])
.controller('AppController', function () {});

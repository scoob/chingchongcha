/* eslint-disable no-unused-vars */
require('angular-mocks');
require('ngstorage');
require('../mode');
require('../game');
require('.');

describe('ScoreboardService', function () {
  let $sessionStorage;
  let GameService;
  let ModeService;
  let ScoreboardService;
  beforeEach(angular.mock.module('ngStorage'));
  beforeEach(function () {
    angular.mock.module('scoreboard');
    angular.mock.module('game');
    angular.mock.module('mode');
    inject(function (_GameService_, _ModeService_,  _$sessionStorage_, _ScoreboardService_) {
      $sessionStorage = _$sessionStorage_;
      GameService = _GameService_;
      ModeService = _ModeService_;
      ScoreboardService = _ScoreboardService_;
    });
  });
  describe('#init', function () {
    beforeEach(function () {
      $sessionStorage.scores = undefined;
    });
    it('should initialise the $sessionStorage.scores', function () {
      ScoreboardService.init();
      expect(Object.keys($sessionStorage.scores).length).to.equal(3);
      expect($sessionStorage.scores.player1).to.equal(0);
    });
  });
  describe('#updateScore', function () {
    beforeEach(function () {
      $sessionStorage.scores.player1 = 0;
      ScoreboardService.updateScore('player1');
    });
    it('should update a players score', function () {
      expect($sessionStorage.scores.player1).to.equal(1);
    });
  });
  describe('#getScore', function () {
    beforeEach(function () {
      $sessionStorage.scores.player1 = 0;
      ScoreboardService.updateScore('player1');
    });
    it('should return a players score', function () {
      expect(ScoreboardService.getScore('player1')).to.equal(1);
    });
  });
  describe('#getScores', function () {
    beforeEach(function () {
      ScoreboardService.init();
      $sessionStorage.scores = {
        player1: 0,
        player2: 0,
        tie: 0
      };
    });
    it('should return all scores', function () {
      expect(Object.keys(ScoreboardService.getScores()).length).to.equal(3);
    });
  });
});
describe('ScoreboardController', function () {
  let $controller;
  let controller;
  let $scope;
  let $rootScope;
  let GameService;
  let $sessionStorage;
  let ScoreboardService;
  beforeEach(angular.mock.module('ngStorage'));
  beforeEach(function () {
    angular.mock.module('game');
    angular.mock.module('mode');
    angular.mock.module('scoreboard');
    inject(function (_$rootScope_, _$controller_, _GameService_, _$sessionStorage_, _ScoreboardService_) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $scope = $rootScope.$new();
      GameService =  _GameService_;
      $sessionStorage = _$sessionStorage_;
      ScoreboardService = _ScoreboardService_;
    });
  });
  beforeEach(function () {
    controller = $controller('ScoreboardController', {
      $scope: $scope
    });
  });
  describe('#getScore', function () {
    beforeEach(function () {
      $sessionStorage.scores.player1 = 2;
    });
    it('should return a players score', function () {
      expect(controller.getScore('player1')).to.equal(2);
    });
  });
  describe('#getScores', function () {
    beforeEach(function () {
      $sessionStorage.scores = {
        player1: 0,
        player2: 0,
        tie: 0
      };
    });
    it('should get all scores', function () {
      expect(Object.keys(controller.getScores()).length).to.equal(3);
    });
  });
  describe('#updateScore', function () {
    beforeEach(function () {
      $sessionStorage.scores.player2 = 2;
      controller.updateScore('player2');
    });
    it('should update a players score', function () {
      expect($sessionStorage.scores.player2).to.equal(3);
    });
  });
});
describe('scorePlayer', function () {
  let $rootScope;
  let $compile;
  let ScoreboardService;
  let $sessionStorage;
  let controller;
  let $scope;
  let $element;
  beforeEach(angular.mock.module('ngStorage'));
  beforeEach(function () {
    angular.mock.module('scoreboard');
    inject(function (_$rootScope_, _$compile_, _ScoreboardService_, _$sessionStorage_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      ScoreboardService =  _ScoreboardService_;
      $sessionStorage = _$sessionStorage_;
      $scope = $rootScope.$new();
    });
  });
  beforeEach(function () {
    const element = angular.element('<div score-player player="player1" ></div>');
    $element = $compile(element)($scope);
    controller = $element.controller('scorePlayer');
    $scope.$apply();
  });
  it('has a player attribute', function () {
    expect($element.attr('player')).to.equal('player1');
  });
  it('updates the score scope', function () {
    $sessionStorage.scores.player1 = 0;
    $scope.score = controller.getScores();
    controller.updateScore('player1');
    $scope.$apply();
    $scope.$digest();
    expect($scope.score.player1).to.equal(1);
  });
});

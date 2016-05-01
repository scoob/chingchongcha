/* eslint-disable no-unused-vars */
require('angular-mocks');
require('ngstorage');
require('../mode');
require('../scoreboard');
require('.');

describe('GameService', function () {
  let $sessionStorage;
  let GameService;
  let ModeService;
  beforeEach(angular.mock.module('ngStorage'));
  beforeEach(function () {
    angular.mock.module('game');
    angular.mock.module('mode');
    inject(function (_GameService_, _ModeService_,  _$sessionStorage_) {
      $sessionStorage = _$sessionStorage_;
      GameService = _GameService_;
      ModeService = _ModeService_;
    });
  });
  describe('#init', function () {
    beforeEach(function () {
      $sessionStorage.results = undefined;
    });
    it('should initialise the $sessionStorage.results', function () {
      GameService.init();
      expect($sessionStorage.results).to.be.empty;
    });
  });
  describe('#randomHand', function () {
    it('should provide a random number within 0 - 2', function () {
      expect(Math.floor(Math.random() * 3)).to.be.within(0, 2);
    });
  });
  describe('#getPlayer', function () {
    const hands = ['rock', 'paper', 'scissors'];
    const hand = 2;
    it('should return the choice of hand for a given Player', function () {
      expect(hands[0]).to.equal('rock');
      expect(hands[hand]).to.equal('scissors');
    });
  });
  describe('#winningMap', function () {
    const winningMap = {
      rock: 'scissors'
    };
    it('should provide the winning combination', function () {
      expect(winningMap.rock).to.equal('scissors');
    });
  });
  describe('#getWinner', function () {
    let winner;
    let tie;
    const winningMap = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };
    beforeEach(function () {
      winner = GameService.getWinner(winningMap, 'rock', 'scissors');
      tie = GameService.getWinner(winningMap, 'rock', 'rock');
    });
    it('should calculate a winner', function () {
      expect(winner).to.equal('player1');
    });
    it('should calculate a tie', function () {
      expect(tie).to.equal('tie');
    });
  });
  describe('#addResult', function () {
    // let results;
    beforeEach(function () {
      $sessionStorage.results = [];
      GameService.addResult('Player 1', 'rock', 'scissors');
      GameService.addResult('Player 1', 'rock', 'scissors');
    });
    it('should add the result of the game', function () {
      expect($sessionStorage.results.length).to.equal(2);
    });
    it('should add the result in reverse', function () {
      expect($sessionStorage.results[0].round).to.equal(2);
    });
  });
  describe('#getLatesResult', function () {
    // let results;
    beforeEach(function () {
      $sessionStorage.results = [];
      GameService.addResult('Player 1', 'rock', 'scissors');
    });
    it('should return the latest result', function () {
      expect($sessionStorage.results[0]).to.not.be.undefined;
    });
  });
  describe('#getResults', function () {
    // let results;
    beforeEach(function () {
      $sessionStorage.results = [];
      GameService.addResult('Player 1', 'rock', 'scissors');
      GameService.addResult('Player 1', 'rock', 'scissors');
    });
    it('should return all the results', function () {
      expect($sessionStorage.results.length).to.equal(2);
    });
  });
  describe('#getGameCount', function () {
    // let results;
    beforeEach(function () {
      $sessionStorage.results = [];
      GameService.addResult('Player 1', 'rock', 'scissors');
      GameService.addResult('Player 1', 'rock', 'scissors');
    });
    it('should return the number of games played', function () {
      expect(Object.keys($sessionStorage.results).length).to.equal(2);
    });
  });
});
describe('GameController', function () {
  let $controller;
  let controller;
  let $scope;
  let $rootScope;
  let GameService;
  let ModeService;
  let $sessionStorage;
  let ScoreboardService;
  beforeEach(angular.mock.module('ngStorage'));
  beforeEach(function () {
    angular.mock.module('game');
    angular.mock.module('scoreboard');
    angular.mock.module('mode');
    inject(function (_$rootScope_, _$controller_, _GameService_, _ModeService_, _$sessionStorage_, _ScoreboardService_) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $scope = $rootScope.$new();
      GameService =  _GameService_;
      ModeService =  _ModeService_;
      $sessionStorage = _$sessionStorage_;
      ScoreboardService = _ScoreboardService_;
    });
  });
  beforeEach(function () {
    controller = $controller('GameController', {
      $scope: $scope
    });
    ModeService.setMode(0);
    ScoreboardService.init();
    $sessionStorage.scores.player1 = 0;
  });
  describe('#play', function () {
    it('should return the winner', function () {
      expect(controller.play(0)).to.not.be.undefined;
    });
  });
  describe('#updateScore', function () {
    it('should increment the winners score', function () {
      controller.updateScore('player1');
      expect(ScoreboardService.getScore('player1')).to.equal(1);
    });
  });
  describe('#getLatesResult', function () {
    beforeEach(function () {
      $sessionStorage.results = [];
      GameService.addResult('Player 1', 'rock', 'scissors');
    });
    it('should return the latest result', function () {
      expect(controller.getLatestResult()).to.equal(GameService.getLatestResult());
    });
  });
  describe('#togglePlayingState', function () {
    it('should toggle the play state', function () {
      controller.togglePlayingState();
      expect(controller.getPlayingState()).to.equal(true);
      controller.togglePlayingState();
      expect(controller.getPlayingState()).to.equal(false);
    });
  });
  describe('#getPlayingState', function () {
    it('should return the play state', function () {
      expect(controller.getPlayingState()).to.equal(false);
    });
  });
});
describe('playButtons', function () {
  let $rootScope;
  let $compile;
  let $timeout;
  let GameService;
  let ModeService;
  let $sessionStorage;
  let ScoreboardService;
  let controller;
  let $scope;
  let $element;
  beforeEach(angular.mock.module('ngStorage'));
  beforeEach(function () {
    angular.mock.module('game');
    angular.mock.module('mode');
    angular.mock.module('scoreboard');
    inject(function (_$rootScope_, _$compile_, _$timeout_, _GameService_, _ModeService_, _$sessionStorage_,  _ScoreboardService_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      $timeout = _$timeout_;
      GameService =  _GameService_;
      ModeService =  _ModeService_;
      $sessionStorage = _$sessionStorage_;
      ScoreboardService = _ScoreboardService_;
      $scope = $rootScope.$new();
    });
  });
  beforeEach(function () {
    const element = angular.element('<button play-button type="0"></button>');
    $element = $compile(element)($scope);
    controller = $element.controller('playButton');
    ScoreboardService.init();
    $sessionStorage.scores.player1 = 0;
  });
  describe('click', function () {
    it('updates the class', function () {
      $element.triggerHandler('click');
      expect($element.hasClass('active')).to.be.true;
      $timeout.flush();
      expect($element.hasClass('active')).to.be.false;
    });
    it('removes the class after a period', function () {
      $element.triggerHandler('click');
      $timeout.flush();
      expect($element.hasClass('active')).to.be.false;
    });
    it('calls the controller.play function', function () {
      $element.triggerHandler('click');
      expect(controller.play(0)).to.not.be.undefined;
    });
    it('has a type attribute', function () {
      $element.triggerHandler('click');
      expect($element.attr('type')).to.equal('0');
    });
  });
});
describe('playersHand', function () {
  let $rootScope;
  let $compile;
  let $timeout;
  let GameService;
  let ModeService;
  let $sessionStorage;
  let ScoreboardService;
  let controller;
  let $scope;
  let $element;
  beforeEach(angular.mock.module('ngStorage'));
  beforeEach(function () {
    angular.mock.module('game');
    angular.mock.module('mode');
    angular.mock.module('scoreboard');
    inject(function (_$rootScope_, _$compile_, _$timeout_, _GameService_, _ModeService_, _$sessionStorage_,  _ScoreboardService_, $controller) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      $timeout = _$timeout_;
      GameService =  _GameService_;
      ModeService =  _ModeService_;
      $sessionStorage = _$sessionStorage_;
      ScoreboardService = _ScoreboardService_;
      $scope = $rootScope.$new();
    });
  });
  beforeEach(function () {
    const element = angular.element('<div class="players-hand" player="player1"></div>');
    $element = $compile(element)($scope);
    controller = $element.controller('playersHand');
  });
  it('has an attached controller', function () {
    expect(controller).to.be.instanceOf(Object);
  });
  it('has a player attribute', function () {
    expect($element.attr('player')).to.equal('player1');
  });
});

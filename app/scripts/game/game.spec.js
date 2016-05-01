require('angular-mocks');
require('ngstorage');
require('../mode');
require('.');

describe('GameService', function () {
  let $sessionStorage;
  let GameService;
  let ModeService; // eslint-disable-line no-unused-vars
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
});

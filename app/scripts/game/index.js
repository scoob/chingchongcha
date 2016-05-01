/**
* Module: game
*
* Manage the game play
*/

const MODULE_NAME = module.exports = 'game';

angular.module(MODULE_NAME, [])
/**
 * @ngdoc service
 * @name dataservices.service:GameService
 * @param $sessionStorage {object} session data
 * @description
 * Service to control game
 */
// @ngInject
.service('GameService', function GameService($sessionStorage) {
  const service = this;
  if (!$sessionStorage.results) {
    $sessionStorage.results = [];
  }
  let player1 = null;
  let player2 = null;
  const hands = ['rock', 'paper', 'scissors'];
  const winningMap = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };
  const playerMap = {
    player1: 'Player 1',
    player2: 'Player 2',
    tie: 'Tie'
  };
  service.play = (hand) => {
    player1 = hands[hand];
    player2 = hands[service.randomHand()];
    const winner = service.getWinner();
    service.addResult(winner);
    return winner;
  };
  service.randomHand = () => Math.floor(Math.random() * 3);
  service.getWinner = () => {
    if (player1 === player2) {
      return 'tie';
    }
    if (player2 === winningMap[player1]) {
      return 'player1';
    }
    return 'player2';
  };
  service.addResult = (winner) => {
    $sessionStorage.results.unshift({
      round: $sessionStorage.results.length + 1,
      winner: playerMap[winner],
      player1,
      player2
    });
  };
  service.getLatestResult = () => $sessionStorage.results[0];
  service.getResults = () => $sessionStorage.results;
  service.getGameCount = () => Object.keys($sessionStorage.results).length;
  service.getPlayers = () => ({
    player1,
    player2
  });
})
/**
 * @ngdoc controller
 * @name scoreboard.controller:ScoreboardController
 * @param ScoreboardService {object} session storage to access scores
 * @description
 * Initialise the scoreboard and allow the scoreboard to get all scores
 */
// @ngInject
.controller('GameController', function GameController(GameService, ScoreboardService) {
  const controller = this;
  let isPlaying = false;

  controller.play = (hand) => GameService.play(hand);
  controller.updateScore = (winner) => ScoreboardService.updateScore(winner);
  controller.getLatestResult = () => GameService.getLatestResult();
  controller.getPlayers = () => GameService.getPlayers();
  controller.togglePlayingState = () => isPlaying = !isPlaying;
  controller.getPlayingState = () => isPlaying;
})
/**
 * @ngdoc directive
 * @name game.directive:playButton
 * @param $timeout {function} force a delay
 * @restrict A
 * @description
 * Register a player's click on a selected hand button
 */
 // @ngInject
.directive('playButton', ($timeout) => ({
  restrict: 'A',
  controller: 'GameController',
  scope: true,
  link: function ($scope, $element, attr, controller) {
    $element.on('click', () => {
      $element.addClass('active'); // highlight the chosen button
      // let player know what the computer is doing
      const loadingCircle = angular.element(document.getElementById('loading-circle')).addClass('active');
      controller.togglePlayingState();
      // make out like the computer is thinking
      $timeout(() => {
        const winner = controller.play(attr.type);
        controller.updateScore(winner);
        controller.togglePlayingState();
        loadingCircle.removeClass('active');
      }, 3000);
      // keep chosen button highlighted a little longer
      $timeout(() => {
        $element.removeClass('active');
      }, 4000);
    });
  }
}))
/**
 * @ngdoc directive
 * @name game.directive:playersHand
 * @restrict C
 * @description
 * Provide the chosen hand by the player
 */
 // @ngInject
.directive('playersHand', () => ({
  restrict: 'C',
  controller: 'GameController',
  scope: true,
  link: function ($scope, $element, attr, controller) {
    $scope.$watchCollection(controller.getPlayers, (players) => {
      if (!players[attr.player]) {
        return;
      }
      $scope.hand = players[attr.player];
    });
  }
}))
.directive('gameWinner', () => ({
  restrict: 'C',
  controller: 'GameController',
  link: function ($scope, $element, attr, controller) {
    const message = (winner) => (winner === 'Tie' ? 'Its a Tie' : winner + ' Won !');
    $scope.$watch(controller.getLatestResult, (result, oldResult) => {
      if (result === oldResult) {
        return;
      }
      $element.addClass(result.winner.toLowerCase().replace(' ', '-') + '-game');
      $element.text(message(result.winner));
    });
  }
}));

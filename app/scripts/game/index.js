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
.service('GameService', function GameService($sessionStorage, ModeService) {
  const service = this;
  // Initialise results if none exist
  service.init = () => {
    if (!$sessionStorage.results) {
      $sessionStorage.results = [];
    }
  };
  /**
   * Get player choices
   * @param hand {integer}
   * @param hands {array}
   * @return choice {string}
   */
  service.getPlayer1 = (hand, hands) => ModeService.getMode() ? hands[service.randomHand()] : hands[hand]; // get the human choice
  service.getPlayer2 = (hand, hands) => hands[service.randomHand()]; // get the computer choice
  /**
   * Calculate the computers choice randomly
   * @return hand index {integer}
   */
  service.randomHand = () => Math.floor(Math.random() * 3);
  /**
   * Calculate the winning player
   * @return player {string}
   */
  service.getWinner = (winningMap, player1, player2) => {
    if (player1 === player2) {
      return 'tie';
    }
    if (player2 === winningMap[player1]) {
      return 'player1';
    }
    return 'player2';
  };
  /**
   * Add the JSON result of the game to the
   * front of the result array
   */
  service.addResult = (winner, player1, player2) => {
    $sessionStorage.results.unshift({
      round: $sessionStorage.results.length + 1,
      winner,
      player1,
      player2
    });
  };
  /**
   * Get the last result
   * @return result {object}
   */
  service.getLatestResult = () => $sessionStorage.results[0];
  /**
   * Get all results
   * @return results {array}
   */
  service.getResults = () => $sessionStorage.results;
  /**
   * Get number games played
   * @return games {integer}
   */
  service.getGameCount = () => Object.keys($sessionStorage.results).length;
})
/**
 * @ngdoc controller
 * @name game.controller:GameController
 * @param GameService {object} session storage to access scores
 * @param ScoreboardService {object} session storage to access scores
 * @description
 * Initialise the scoreboard and allow the scoreboard to get all scores
 */
// @ngInject
.controller('GameController', function GameController(GameService, ScoreboardService) {
  const controller = this;
  // Useful maps for game control
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
  let isPlaying = false;
  // initialise
  GameService.init();
  // play the game and get the winner
  controller.play = (hand) => {
    const player1 = GameService.getPlayer1(hand, hands);
    const player2 = GameService.getPlayer2(hand, hands);
    const winner = GameService.getWinner(winningMap, player1, player2);
    GameService.addResult(playerMap[winner], player1, player2);
    return winner;
  };
  controller.updateScore = (winner) => ScoreboardService.updateScore(winner);
  controller.getLatestResult = () => GameService.getLatestResult();
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
    $scope.$watchCollection(controller.getLatestResult, (players) => {
      if (!players[attr.player]) {
        return;
      }
      $scope.hand = players[attr.player];
    });
  }
}))
/**
 * @ngdoc directive
 * @name game.directive:gameWinner
 * @restrict C
 * @description
 * Show the winner of the game and update class accordingly
 */
 // @ngInject
.directive('gameWinner', () => ({
  restrict: 'C',
  controller: 'GameController',
  link: function ($scope, $element, attr, controller) {
    const message = (winner) => (winner === 'Tie' ? 'Its a Tie' : winner + ' Won !');
    $scope.$watch(controller.getLatestResult, (result, oldResult) => {
      if (result === oldResult) {
        return;
      }
      // remove all winner classes
      $element.removeClass('tie-game');
      $element.removeClass('player-1-game');
      $element.removeClass('player-2-game');
      $element.addClass(result.winner.toLowerCase().replace(' ', '-') + '-game');
      $element.text(message(result.winner));
    });
  }
}));

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
    const player1 = hands[hand];
    const player2 = hands[service.randomHand()];
    const winner = service.getWinner(player1, player2);
    service.addResult(winner, player1, player2);
    return winner;
  };
  service.randomHand = () => Math.floor(Math.random() * 3);
  service.getWinner = (p1, p2) => {
    if (p1 === p2) {
      return 'tie';
    }
    if (p2 === winningMap[p1]) {
      return 'player1';
    }
    return 'player2';
  };
  service.addResult = (winner, player1, player2) => {
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
  controller.play = (hand) => GameService.play(hand);
  controller.updateScore = (winner) => ScoreboardService.updateScore(winner);
  controller.getLatestResult = () => GameService.getLatestResult();
})
.directive('playButton', () => ({
  restrict: 'A',
  controller: 'GameController',
  scope: true,
  link: function ($scope, $element, attr, controller) {
    $element.on('click', () => {
      const winner = controller.play(attr.type);
      $scope.$apply(() => controller.updateScore(winner));
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

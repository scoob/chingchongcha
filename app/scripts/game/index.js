/**
* Module: game
*
* Manage the game play
*/

const MODULE_NAME = module.exports = 'game';

angular.module(MODULE_NAME, [])
/**
 * @ngdoc service
 * @name dataservices.service:ScoreboardService
 * @param $sessionStorage {object} local storage to access token
 * @description
 * Service to control the scoring
 */
// @ngInject
.service('GameService', function GameService($sessionStorage) {
  const service = this;
  if (typeof $sessionStorage.rounds === undefined) {
    $sessionStorage.rounds = [];
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
    service.addRound(winner, player1, player2);
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
  service.addRound = (winner, player1, player2) => {
    $sessionStorage.rounds.push({
      round: $sessionStorage.rounds.length + 1,
      winner: playerMap[winner],
      player1,
      player2
    });
  };
  service.getLatestResult = () => $sessionStorage.rounds[$sessionStorage.rounds.length - 1];
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
.directive('gameResult', () => ({
  restrict: 'A',
  controller: 'GameController',
  link: function ($scope, $element, attr, controller) {
    const message = (winner) => (winner === 'Tie' ? 'Its a Tie' : winner + ' Won !');
    $scope.$watch(controller.getLatestResult, (result, oldResult) => {
      if (result === oldResult) {
        return;
      }
      $element.text(message(result.winner));
    });
  }
}));

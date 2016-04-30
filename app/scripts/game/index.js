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
.service('GameService', function GameService() {
  const service = this;
  const rounds = [];
  const hands = ['rock', 'paper', 'scissors'];
  const winningMap = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
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
    rounds.push({
      round: rounds.length + 1,
      winner,
      player1,
      player2
    });
  };
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
})
.directive('playButton', () => ({
  restrict: 'A',
  controller: 'GameController',
  scope: true,
  link: function ($scope, $element, attr, controller) {
    $element.on('click', () => {
      const winner = controller.play(attr.type);
      console.log(winner);
      controller.updateScore(winner);
    });
  }
}));

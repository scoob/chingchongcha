/**
* Module: scoreboard
*
* Controls for managing the scoring process
*/

const MODULE_NAME = module.exports = 'scoreboard';

angular.module(MODULE_NAME, [])
/**
 * @ngdoc service
 * @name dataservices.service:ScoreboardService
 * @param $sessionStorage {object} local storage to access token
 * @description
 * Service to control the scoring
 */
// @ngInject
.service('ScoreboardService', function ScoreboardService($sessionStorage) {
  const service = this;
  service.init = () => {
    $sessionStorage.scores = {
      player1: 0,
      player2: 0,
      tie: 0
    };
  };
  service.updateScore = (player) => $sessionStorage.scores[player]++;
  service.getScore = (player) => $sessionStorage.scores[player];
  service.getScores = () => $sessionStorage.scores;
})
/**
 * @ngdoc controller
 * @name scoreboard.controller:ScoreboardController
 * @param ScoreboardService {object} session storage to access scores
 * @description
 * Initialise the scoreboard and allow the scoreboard to get all scores
 */
// @ngInject
.controller('ScoreboardController', function ScoreboardController(ScoreboardService) {
  const controller = this;
  // initialise the scoreboard
  controller.init = ScoreboardService.init;
  // get a specific players score
  controller.getScore = (player) => ScoreboardService.getScore(player);
  controller.getScores = () => ScoreboardService.getScores();
  controller.updateScore = (player) => ScoreboardService.updateScore(player);
})
/**
 * @ngdoc directive
 * @name scoreboard.directive:scorePlayer
 * @restrict C
 * @description
 * Populate player's score
 */
 // @ngInject
.directive('scorePlayer', () => ({
  restrict: 'A',
  controller: 'ScoreboardController',
  scope: true,
  link: function ($scope, element, attr, controller) {
    // $scope.score = controller.getScore(attr.player);
    $scope.$watchCollection(controller.getScores, (score, oldScore) => {
      // initial load of page
      if (score === oldScore) {
        $scope.score = controller.getScore(attr.player);
        return;
      }
      $scope.score = score[attr.player];
    });
  }
}));

/**
* Module: onboarding
*
* Controllers for managing the onboarding process
*/

const MODULE_NAME = module.exports = 'scoreboard';

angular.module(MODULE_NAME, [])
/**
 * @ngdoc service
 * @name dataservices.service:ScoreboardService
 * @param $http {object} asyncronous protocol call
 * @param $localStorage {object} local storage to access token
 * @return $http {function} Data from API
 * @description
 * Service to access data from API
 */
// @ngInject
.service('ScoreboardService', function ScoreboardService($sessionStorage) {
  const service = this;
  service.init = () => {
    $sessionStorage.scores = {
      PLAYER1: 0,
      PLAYER2: 0,
      TIE: 0
    };
  };
  service.updateScore = (player) => $sessionStorage.scores[player]++;
  service.getScore = (player) => $sessionStorage.scores[player];
})
/**
 * @ngdoc controller
 * @name onboarding.controller:OnboardingSiteSelectController
 * @description
 * Allows user to select the current site they want to set up
 */
// @ngInject
.controller('ScoreboardController', function ScoreboardController(ScoreboardService) {
  const controller = this;
  // initialise the scoreboard
  ScoreboardService.init();
  // get a players score
  controller.getScore = (player) => ScoreboardService.getScore(player);
})
/**
 * @ngdoc directive
 * @name scoreboard.directive:scoreboard
 * @restrict C
 * @description
 * Populate scores
 */
 // @ngInject
.directive('scoreboard', () => ({
  restrict: 'C',
  controller: 'ScoreboardController',
  link: function ($scope, $element, attr, controller) {
    $scope.PLAYER1 = controller.getScore('PLAYER1');
    $scope.PLAYER2 = controller.getScore('PLAYER2');
    $scope.TIE = controller.getScore('TIE');
  }
}));

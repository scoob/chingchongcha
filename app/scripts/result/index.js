/**
* Module: result
*
* Display results
*/

const MODULE_NAME = module.exports = 'result';

angular.module(MODULE_NAME, [])
/**
 * @ngdoc controller
 * @name result.controller:ResultController
 * @param GameService {object} session storage to access game control
 * @description
 * Allow players to see the store results
 */
// @ngInject
.controller('ResultController', function ResultController(GameService) {
  const controller = this;
  controller.getResults = () => GameService.getResults();
  controller.getCurrentGame = () => GameService.getGameCount();
})
/**
 * @ngdoc directive
 * @name result.directive:resultsList
 * @restrict C
 * @description
 * Update the results when game is finished
 */
 // @ngInject
.directive('resultsList', () => ({
  restrict: 'C',
  controller: 'ResultController',
  scope: true,
  link: function ($scope, $element, attr, controller) {
    $scope.$watchCollection(controller.getResults, (results) => {
      if (!results) {
        return;
      }
      $scope.results = results;
      $scope.currentGame = controller.getCurrentGame();
    });
  }
}));

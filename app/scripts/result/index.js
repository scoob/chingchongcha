/**
* Module: result
*
* Display results
*/

const MODULE_NAME = module.exports = 'result';

angular.module(MODULE_NAME, [])
.controller('ResultController', function ResultController(GameService) {
  const controller = this;
  controller.getResults = () => GameService.getResults();
  controller.getCurrentGame = () => GameService.getGameCount();
})
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

/**
* Module: onboarding
*
* Controllers for managing the onboarding process
*/

const MODULE_NAME = module.exports = 'result';

angular.module(MODULE_NAME, [])
.controller('ResultController', function ResultController(GameService) {
  const controller = this;
  controller.getResults = () => GameService.getResults();
  controller.currentGame = GameService.getGameCount();
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
      $scope.currentGame = controller.currentGame;
    });
  }
}))
.directive('resultItem', () => ({
  restrict: 'C',
  require: '^resultsList',
  link: function ($scope, $element, attr) {
    $element.on('hover', () => {
      console.log(attr);
    });
  }
}));

/**
* Module: countdown
*
* Manage the countdown timer
*/

const MODULE_NAME = module.exports = 'countdown';

angular.module(MODULE_NAME, [])
/**
 * @ngdoc directive
 * @name mode.directive:countdown
 * @param $timeout {function} track the time
 * @restrict C
 * @description
 * Add a simple countdown timer
 */
 // @ngInject
.directive('countdown', ($timeout) => ({
  restrict: 'C',
  link: function ($scope, $element) {
    let counter = 60;
    $element.text('You got 60 minutes'); // default text
    $scope.onTimeout = () => {
      const countdown = 'You got ' + parseInt(counter, 10) + ' minutes';
      $element.text(countdown);
      counter--;
      $timeout($scope.onTimeout, 60000);
    };
    $timeout($scope.onTimeout, 60000);
  }
}));

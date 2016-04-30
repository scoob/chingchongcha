/**
* Module: mode
*
* Controls for managing the game mode
*/

const MODULE_NAME = module.exports = 'mode';

angular.module(MODULE_NAME, [])
/**
 * @ngdoc service
 * @name dataservices.service:ModeService
 * @param $sessionStorage {object} local storage to access token
 * @description
 * Service to control the game mode
 */
// @ngInject
.service('ModeService', function ModeService($sessionStorage) {
  const service = this;
  service.init = () => $sessionStorage.mode = 0; // 0 = human, 1 = computer
  service.setMode = (mode) => $sessionStorage.mode = mode;
  service.getMode = () => $sessionStorage.mode;
})
/**
 * @ngdoc controller
 * @name mode.controller:ModeController
 * @param ModeService {object} session storage to access mode
 * @description
 * Allow mode to be set and retreaved
 */
// @ngInject
.controller('ModeController', function ModeController(ModeService) {
  const controller = this;
  controller.setMode = (mode) => ModeService.setMode(mode);
  controller.getMode = () => ModeService.getMode();
})
/**
 * @ngdoc directive
 * @name mode.directive:modeButton
 * @restrict A
 * @description
 * Allow user to set the game mode and update the session storage
 */
 // @ngInject
.directive('modeButton', () => ({
  restrict: 'A',
  controller: 'ModeController',
  scope: true,
  link: function ($scope, $element, attr, controller) {
    $scope.mode = controller.getMode() ? true : false;
    $scope.$watch('mode', (mode) => {
      controller.setMode(mode ? true : false);
    });
  }
}))
/**
 * @ngdoc directive
 * @name mode.directive:modeState
 * @restrict A
 * @description
 * Access the state of the game mode
 */
 // @ngInject
.directive('modeState', () => ({
  restrict: 'A',
  controller: 'ModeController',
  scope: true,
  link: function ($scope, $element, attr, controller) {
    $scope.$watch(controller.getMode, (mode) => {
      $scope.mode = mode;
    });
  }
}));

/**
* Module: onboarding
*
* Controllers for managing the onboarding process
*/

const MODULE_NAME = module.exports = 'round';

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
.service('RoundService', function ScoreboardService($sessionStorage) {
  const service = this;
  service.init = () => {
    $sessionStorage.rounds = {}; // no games played
    // service.setGameMode(0); // human v computer
  };
  // service.setGameMode = (mode) => $sessionStorage.mode = mode;
  service.addRound = () => $sessionStorage.games++;
  service.getRounds = () => $sessionStorage.games;
});

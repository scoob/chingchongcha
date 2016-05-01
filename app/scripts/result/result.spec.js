/* eslint-disable no-unused-vars */
require('angular-mocks');
require('ngstorage');
require('../result');
require('../game');
require('../mode');
require('.');

describe('ResultController', function () {
  let $controller;
  let controller;
  let $scope;
  let $rootScope;
  let GameService;
  let $sessionStorage;
  beforeEach(angular.mock.module('ngStorage'));
  beforeEach(function () {
    angular.mock.module('game');
    angular.mock.module('mode');
    angular.mock.module('result');
    inject(function (_$rootScope_, _$controller_, _GameService_, _$sessionStorage_) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $scope = $rootScope.$new();
      GameService =  _GameService_;
      $sessionStorage = _$sessionStorage_;
    });
  });
  beforeEach(function () {
    controller = $controller('ResultController', {
      $scope: $scope
    });
    GameService.init();
    $sessionStorage.results = [];
    GameService.addResult('Player 1', 'rock', 'scissors');
  });
  describe('#getResults', function () {
    it('should return all results', function () {
      expect(controller.getResults().length).to.equal(1);
    });
  });
  describe('#getCurrentGame', function () {
    it('should get the current game count', function () {
      expect(controller.getCurrentGame()).to.equal(1);
    });
  });
});
describe('resultsList', function () {
  let $rootScope;
  let $compile;
  let GameService;
  let $sessionStorage;
  let controller;
  let $scope;
  let $element;
  beforeEach(angular.mock.module('ngStorage'));
  beforeEach(function () {
    angular.mock.module('mode');
    angular.mock.module('game');
    angular.mock.module('result');
    inject(function (_$rootScope_, _$compile_, _GameService_, _$sessionStorage_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      GameService =  _GameService_;
      $sessionStorage = _$sessionStorage_;
      $scope = $rootScope.$new();
    });
  });
  beforeEach(function () {
    const element = angular.element('<div class="results-list"></div>');
    $element = $compile(element)($scope);
    controller = $element.controller('resultsList');
    $scope.$apply();
  });
  it('updates the results scope', function () {
    $sessionStorage.results = [];
    $scope.results = controller.getResults();
    GameService.addResult('Player 1', 'rock', 'scissors');
    $scope.$digest();
    expect($scope.results.length).to.equal(1);
  });
});

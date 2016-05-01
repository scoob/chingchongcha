/* eslint-disable no-unused-vars */
require('angular-mocks');
require('ngstorage');
require('../mode');
require('.');

describe('ModeService', function () {
  let $sessionStorage;
  let ModeService;
  beforeEach(angular.mock.module('ngStorage'));
  beforeEach(function () {
    angular.mock.module('mode');
    inject(function (_ModeService_,  _$sessionStorage_) {
      $sessionStorage = _$sessionStorage_;
      ModeService = _ModeService_;
    });
  });
  describe('#init', function () {
    beforeEach(function () {
      $sessionStorage.mode = undefined;
    });
    it('should initialise the $sessionStorage.mode', function () {
      ModeService.init();
      expect($sessionStorage.mode).to.be.empty;
    });
  });
  describe('#setMode', function () {
    it('should set the mode', function () {
      ModeService.setMode(1);
      expect($sessionStorage.mode).to.equal(1);
    });
  });
  describe('#getMode', function () {
    it('should get the mode', function () {
      ModeService.setMode(99);
      expect(ModeService.getMode()).to.equal(99);
    });
  });
});
describe('ModeController', function () {
  let $controller;
  let controller;
  let $scope;
  let $rootScope;
  let ModeService;
  let $sessionStorage;
  beforeEach(angular.mock.module('ngStorage'));
  beforeEach(function () {
    angular.mock.module('mode');
    inject(function (_$rootScope_, _$controller_, _ModeService_, _$sessionStorage_) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $scope = $rootScope.$new();
      ModeService =  _ModeService_;
      $sessionStorage = _$sessionStorage_;
    });
  });
  beforeEach(function () {
    controller = $controller('ModeController', {
      $scope: $scope
    });
    ModeService.setMode(20);
  });
  describe('#getMode', function () {
    it('should return the mode', function () {
      expect(controller.getMode()).to.equal(20);
    });
  });
  describe('#setMode', function () {
    it('should set the mode', function () {
      controller.setMode(33);
      expect($sessionStorage.mode).to.equal(33);
    });
  });
});
describe('modeButton', function () {
  let $rootScope;
  let $compile;
  let ModeService;
  let $sessionStorage;
  let controller;
  let $scope;
  let $element;
  beforeEach(angular.mock.module('ngStorage'));
  beforeEach(function () {
    angular.mock.module('mode');
    inject(function (_$rootScope_, _$compile_, _ModeService_, _$sessionStorage_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      ModeService =  _ModeService_;
      $sessionStorage = _$sessionStorage_;
      $scope = $rootScope.$new();
    });
  });
  beforeEach(function () {
    const element = angular.element('<input mode-button />');
    $element = $compile(element)($scope);
    controller = $element.controller('modeButton');
    controller.setMode(0);
    $scope.$apply();
  });
  it('updates the mode scope', function () {
    $scope.mode = controller.getMode();
    $scope.$digest();
    expect($scope.mode).to.equal(true);
  });
});

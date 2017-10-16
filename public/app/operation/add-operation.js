'use strict';

angular.module('warehouse.addOperation', [
  'ngRoute',
  'pascalprecht.translate',
  'EnumService',
  'ItemService',
  'OperationService',
  'WarehouseService'
]);

angular.module('warehouse.addOperation').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/add-operation', {
      templateUrl: 'app/operation/add-operation.html',
      controller: 'AddOperationCtrl'
    });
  }
]);

angular.module('warehouse.addOperation')
  .controller('AddOperationCtrl', [
    '$scope',
    'OperationTypeService',
    'ItemService',
    'WarehouseService',
    '$location',
    function($scope, OperationTypeService, ItemService, WarehouseService, $location) {
      //angular functions
      $scope.createOperation = function() {
        console.log($scope.operation);
        OperationService.create($scope.operation).then(function successCallback(response) {
          console.log('return to operation');
          $location.path('/operation');
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      //private functions
      var retrieveWarehouses = function() {
        WarehouseService.get().then(function successCallback(response) {
          $scope.warehouses = response.data
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      var retrieveItems = function() {
        ItemService.get().then(function successCallback(response) {
          $scope.items = response.data
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      var retrieveTypes = function() {
        $scope.operationTypes = OperationTypeService.get();
      }

      //init controller
      $scope.operation = {};
      $scope.warehouses = [];
      $scope.items = [];
      $scope.operationTypes = [];

      retrieveWarehouses();
      retrieveItems();
      retrieveTypes();

    }
  ]);

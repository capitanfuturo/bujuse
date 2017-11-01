'use strict';

angular.module('warehouse.editWarehouse', [
  'ngRoute',
  'pascalprecht.translate',
  'WarehouseService'
]);

angular.module('warehouse.editWarehouse').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/edit-warehouse/:warehouseId', {
      templateUrl: 'app/warehouse/edit-warehouse.html',
      controller: 'EditWarehouseCtrl'
    });
  }
]);

angular.module('warehouse.editWarehouse')
  .controller('EditWarehouseCtrl', [
    '$scope',
    'WarehouseService',
    '$location',
    '$routeParams',
    function($scope, WarehouseService, $location, $routeParams) {
      //angular functions
      $scope.editWarehouse = function() {
          WarehouseService.update($scope.warehouse).then(function successCallback(response) {
              $location.path('/warehouse');
          }, function errorCallback(response) {
              console.log(response);
          });
      };

      //private functions

      //init controller
      var warehouseId = $routeParams.warehouseId;

      $scope.warehouse = {};

      WarehouseService.getById(warehouseId).then(function successCallback(response) {
          $scope.warehouse = response.data;
      }, function errorCallback(response) {
          console.log(response);
      });
    }
  ]);

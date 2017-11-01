'use strict';

angular.module('warehouse.addWarehouse', [
  'ngRoute',
  'pascalprecht.translate',
  'WarehouseService'
]);

angular.module('warehouse.addWarehouse').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/add-warehouse', {
      templateUrl: 'app/warehouse/add-warehouse.html',
      controller: 'AddWarehouseCtrl'
    });
  }
]);

angular.module('warehouse.addWarehouse')
  .controller('AddWarehouseCtrl', [
    '$scope',
    'WarehouseService',
    '$location',
    function($scope, WarehouseService, $location) {
      //angular functions
      $scope.createWarehouse = function() {
        console.log($scope.warehouse);
        WarehouseService.create($scope.warehouse).then(function successCallback(response) {
          console.log('return to warehouse');
          $location.path('/warehouse');
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      $scope.cancel = function(){
        $location.path('/warehouse');
      };

      //private functions

      //init controller
      $scope.warehouse = {};
    }
  ]);

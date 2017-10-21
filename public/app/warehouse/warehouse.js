'use strict';

angular.module('warehouse.warehouse', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'WarehouseService'
]);

angular.module('warehouse.warehouse').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/warehouse', {
      templateUrl: 'app/warehouse/warehouse.html',
      controller: 'WarehouseCtrl'
    });
  }
]);

angular.module('warehouse.warehouse')
  .controller('WarehouseCtrl', [
    '$scope',
    'WarehouseService',
    '$location',
    function($scope, WarehouseService, $location) {

      //angular functions
      $scope.add = function() {
        $location.path('/add-warehouse');
      };

      $scope.view = function(row) {
        var id = row._id;
        WarehouseService.getItems(id).then(function successCallback(response) {
          $location.path('/item');
        }, function errorCallback(response) {
          console.log(response);
        });
      }

      $scope.remove = function(row) {
        var id = row._id;
        WarehouseService.delete(id).then(function successCallback(response) {
          console.log("Deleted..." + response);
          retrieveWarehouses();
        }, function errorCallback(response) {
          console.log(response);
        });
      }

      //private functions
      var retrieveWarehouses = function() {
        WarehouseService.get().then(function successCallback(response) {
          console.log(response.data);
          $scope.rowCollection = response.data
        }, function errorCallback(response) {
          console.log(response);
        });
      };


      //init controller
      console.log('init WarehouseCtrl');
      $scope.rowCollection = [];
      retrieveWarehouses();
    }
  ]);

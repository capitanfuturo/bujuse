'use strict';

angular.module('app', [
  'ngRoute',
  'smart-table',
  'WarehouseService',
  'warehouse.warehouse',
  'warehouse.addWarehouse',
  'warehouse.item'
]);

angular.module('app').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/warehouse'
    });
  }
]);

angular.module('app').controller('ApplicationCtrl',
  function($rootScope, $scope, $location) {

  });

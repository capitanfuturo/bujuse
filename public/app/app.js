'use strict';

angular.module('app', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'EnumService',
  'ItemService',
  'OperationService',
  'WarehouseService',
  'warehouse.warehouse',
  'warehouse.addWarehouse',
  'warehouse.item',
  'warehouse.operation',
  'warehouse.addOperation'
]);

angular.module('app').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/operation'
    });
  }
]);

angular.module('app').controller('ApplicationCtrl',
  function($rootScope, $scope, $location) {

  });

'use strict';

angular.module('app', [
  'ngRoute',
  'monospaced.qrcode',
  'pascalprecht.translate',
  'smart-table',
  'EnumService',
  'ItemService',
  'OperationService',
  'WarehouseService',
  'warehouse.warehouse',
  'warehouse.addWarehouse',
  'warehouse.editWarehouse',
  'warehouse.item',
  'warehouse.addItem',
  'warehouse.editItem',
  'warehouse.operation',
  'warehouse.addOperation',
  'warehouse.editOperation'
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

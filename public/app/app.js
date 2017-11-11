'use strict';

angular.module('app', [
  'ngRoute',
  'monospaced.qrcode',
  'pascalprecht.translate',
  'smart-table',
  'AuthenticationService',
  'EnumService',
  'ItemService',
  'OperationService',
  'ReportService',
  'WarehouseService',
  'warehouse.warehouse',
  'warehouse.addWarehouse',
  'warehouse.editWarehouse',
  'warehouse.item',
  'warehouse.addItem',
  'warehouse.editItem',
  'warehouse.operation',
  'warehouse.addOperation',
  'warehouse.editOperation',
  'warehouse.login',
  'warehouse.stock',
  'warehouse.monthlySales'
]);

angular.module('app').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/operation'
    });
  }
]);

angular.module('app').controller('ApplicationCtrl',
  function ($rootScope, AuthenticationService) {
    $rootScope.isLoggedIn = AuthenticationService.isLoggedIn();
    $rootScope.currentUser = AuthenticationService.currentUser();
  });

angular.module('app').run(['$rootScope', '$location', 'AuthenticationService',
  function ($rootScope, $location, AuthenticationService) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
      if ($location.path() != '/login' && !AuthenticationService.isLoggedIn()) {
        $location.path('/login');
      }
    });
  }
]);

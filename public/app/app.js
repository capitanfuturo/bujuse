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
  'OrderService',
  'ReportService',
  'WarehouseService',
  'warehouse.addCustomer',
  'warehouse.addItem',
  'warehouse.addOperation',
  'warehouse.addWarehouse',
  'warehouse.customer',
  'warehouse.editCustomer',
  'warehouse.editItem',
  'warehouse.editOperation',
  'warehouse.editWarehouse',
  'warehouse.item',
  'warehouse.login',
  'warehouse.monthlySales',
  'warehouse.operation',
  'warehouse.order',
  'warehouse.stock',
  'warehouse.warehouse',
  'warehouse.addOrder',
  'warehouse.viewOrder',
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

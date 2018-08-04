'use strict';

angular.module('app', [
  'ngRoute',
  'monospaced.qrcode',
  'pascalprecht.translate',
  'smart-table',
  'ui.bootstrap',
  'AuthenticationService',
  'EnumService',
  'ItemService',
  'OperationService',
  'OrderService',
  'ReportService',
  'SeasonService',
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
  'warehouse.quarterlySales',
  'warehouse.operation',
  'warehouse.order',
  'warehouse.stock',
  'warehouse.warehouse',
  'warehouse.addOrder',
  'warehouse.viewOrder',
  'warehouse.editOrder',
  'warehouse.season',
  'warehouse.addSeason'
]);

angular.module('app').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/operation'
    });
  }
]);

angular.module('app').controller('ApplicationCtrl',
  function ($rootScope, $scope, AuthenticationService, $location) {
    $rootScope.isLoggedIn = AuthenticationService.isLoggedIn();
    $rootScope.currentUser = AuthenticationService.currentUser();

    $scope.logout = function () {
      AuthenticationService.logout();
      $location.path('/login');
    };

    $rootScope.isCollapsed = true;
  });

angular.module('app').run(['$rootScope', '$location', 'AuthenticationService',
  function ($rootScope, $location, AuthenticationService) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
      $rootScope.isCollapsed = true;

      if ($location.path() != '/login' && !AuthenticationService.isLoggedIn()) {
        $location.path('/login');
        return;
      }else{
        if(!$rootScope.currentUser){
          $rootScope.currentUser = AuthenticationService.currentUser();
        }

        if($rootScope.currentUser && $rootScope.currentUser.role){
          if($rootScope.currentUser.role == 'ADMIN'){
            return;
          }
        }else{
          var path = $location.path();
          if(path == '/operation' || path == '/warehouse' || path == '/quarterly-sales' || path == '/monthly-sales' || path == '/stock'){
            $location.path('/order');
          }
        }

        return;
      }
    });
  }

]);

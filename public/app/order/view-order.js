'use strict';

angular.module('warehouse.viewOrder', [
  'ngRoute',
  'pascalprecht.translate',
  'EnumService',
  'ItemService',
  'OrderService',
  'CustomerService'
]);

angular.module('warehouse.viewOrder').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/view-order', {
      templateUrl: 'app/order/view-order.html',
      controller: 'ViewOrderCtrl'
    });
  }
]);

angular.module('warehouse.viewOrder')
  .controller('ViewOrderCtrl', ['$scope', '$location', function ($scope, $location) {
    //angular functions
    $scope.goBack = function () {
      $location.path('/order');
    }
    //private functions

    //init controller
    $scope.order = {};
  }]);

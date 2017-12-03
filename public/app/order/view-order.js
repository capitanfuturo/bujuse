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
    $routeProvider.when('/view-order/:orderId', {
      templateUrl: 'app/order/view-order.html',
      controller: 'ViewOrderCtrl'
    });
  }
]);

angular.module('warehouse.viewOrder')
  .controller('ViewOrderCtrl', ['$scope',
    '$location',
    '$routeParams',
    'OrderService',
    function ($scope, $location, $routeParams, OrderService) {
      //angular functions
      $scope.goBack = function () {
        $location.path('/order');
      }
      //private functions

      //init controller
      var orderId = $routeParams.orderId;

      $scope.order = {};

      OrderService.getById(orderId).then(function successCallback(response) {
        $scope.order = response.data;
      }, function errorCallback(response) {
        console.log(response);
      });

    }
  ]);

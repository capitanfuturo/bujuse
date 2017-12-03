'use strict';

angular.module('warehouse.order', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'OrderService'
]);

angular.module('warehouse.order').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/order', {
      templateUrl: 'app/order/order.html',
      controller: 'OrderCtrl'
    });
  }
]);

angular.module('warehouse.order')
  .controller('OrderCtrl', [
    '$scope',
    'OrderService',
    '$location',
    function ($scope, OrderService, $location) {

      //angular functions
      $scope.add = function () {
        $location.path('/add-order');
      };

      $scope.changeState = function (row) {
        var actualState = row.state;

        if (actualState == 'NEW') {
          row.state = 'WORKING';
        } else if (actualState == 'WORKING') {
          row.state = 'READY';
        } else if (actualState == 'READY') {
          row.state = 'DELIVERED';
        }

        OrderService.edit(row).then(function successCallback(response) {
          retrieveOrders();
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      $scope.remove = function (row) {
        var id = row._id;
        OrderService.delete(id).then(function successCallback(response) {
          var index = $scope.rowCollection.indexOf(row);
          if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
          }
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      $scope.view = function(row){
        var id = row._id;
        $location.path('/view-order/' + id);
      }

      //private functions
      var retrieveOrders = function () {
        OrderService.get().then(function successCallback(response) {
          $scope.rowCollection = response.data
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      //init controller
      $scope.rowCollection = [];
      retrieveOrders();
    }
  ]);

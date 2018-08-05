'use strict';

angular.module('warehouse.order', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'ui.bootstrap',
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
    '$window',
    '$translate',
    function ($scope, OrderService, $location, $window, $translate) {

      //angular functions
      $scope.add = function () {
        $location.path('/add-order');
      };

      $scope.edit = function (row) {
        var orderId = row._id;
        $location.path('/edit-order/' + orderId);
      };

      $scope.changeState = function (row) {
        var actualState = row.state;

        if (actualState == 'NEW') {
          row.state = 'WORKING';
          doEdit(row);
        } else if (actualState == 'WORKING') {
          row.state = 'READY';
          doEdit(row);
        } else if (actualState == 'READY') {
          $translate('CONFIRM_SENT_ORDER').then(function (confirmText) {
            var confirmed = $window.confirm(confirmText);
            if (confirmed) {
              row.state = 'DELIVERED';
              doEdit(row);
            }
          }, function (translationId) {
            console.log(translationId);
          });
        }
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

      $scope.detail = function (row) {
        var id = row._id;
        $location.path('/view-order/' + id);
      };

      $scope.toggleDelivered = function () {
        retrieveOrders($scope.view.showDelivered);
      };

      //private functions
      var doEdit = function (row) {
        OrderService.edit(row).then(function successCallback(response) {
          retrieveOrders();
        }, function errorCallback(response) {
          console.log(response);
        });
      }

      var retrieveOrders = function (showDelivered) {
        OrderService.get(showDelivered).then(function successCallback(response) {
          var data = response.data;
          //TODO add priority
          // amount
          var dataSize = data.length;
          for (var e = 0; e < dataSize; e++) {
            var order = data[e];
            if (order.state != 'DELIVERED') {
              var size = order.elements.length;
              var amount = 0;
              for (var i = 0; i < size; i++) {
                var element = order.elements[i];
                amount = amount + element.price;
              }
              if (order.deposit) {
                amount = amount - order.deposit;
              }
              data[e].amount = amount;
            }

          }

          $scope.rowCollection = data;
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      //init controller
      $scope.rowCollection = [];
      $scope.view = {};
      $scope.view.showDelivered = false;
      retrieveOrders();
    }
  ]);

'use strict';

angular.module('warehouse.stock', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'ReportService'
]);

angular.module('warehouse.stock').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/stock', {
      templateUrl: 'app/report/stock.html',
      controller: 'StockCtrl'
    });
  }
]);

angular.module('warehouse.stock')
  .controller('StockCtrl', [
    '$scope',
    'ReportService',
    '$location',
    function ($scope, ReportService, $location) {

      //angular functions

      //private functions
      var retrieveStocks = function () {
        ReportService.getStock().then(function successCallback(response) {
          $scope.rowCollection = response.data;
          var qtyAmount = 0;
          var amount = 0;
          if($scope.rowCollection && $scope.rowCollection.length){
            var size = $scope.rowCollection.length;
            for (var i = 0; i < size; i++) {
              var operation = $scope.rowCollection[i];
              qtyAmount = qtyAmount + operation.quantity;
              amount = amount + operation.price;
            }
          }
          $scope.qtyAmount = qtyAmount;
          $scope.amount = amount;
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      //init controller
      $scope.rowCollection = [];
      $scope.qtyAmount = 0;
      $scope.amount = 0;

      retrieveStocks();
    }
  ]);

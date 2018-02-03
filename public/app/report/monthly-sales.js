'use strict';

angular.module('warehouse.monthlySales', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'ReportService'
]);

angular.module('warehouse.monthlySales').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/monthly-sales', {
      templateUrl: 'app/report/monthly-sales.html',
      controller: 'MonthlySalesCtrl'
    });
  }
]);

angular.module('warehouse.monthlySales')
  .controller('MonthlySalesCtrl', [
    '$scope',
    'ReportService',
    '$location',
    function ($scope, ReportService, $location) {

      //angular functions

      //private functions
      var retrieveMonthlySales = function () {
        ReportService.getMonthlySales().then(function successCallback(response) {
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
          $scope.amount = Math.round(amount * 100) / 100;
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      //init controller
      $scope.rowCollection = [];
      $scope.qtyAmount = 0;
      $scope.amount = 0;

      retrieveMonthlySales();
    }
  ]);

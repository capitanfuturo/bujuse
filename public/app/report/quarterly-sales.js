'use strict';

angular.module('warehouse.quarterlySales', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'ReportService'
]);

angular.module('warehouse.quarterlySales').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/quarterly-sales', {
      templateUrl: 'app/report/quarterly-sales.html',
      controller: 'QuarterlySalesCtrl'
    });
  }
]);

angular.module('warehouse.quarterlySales')
  .controller('QuarterlySalesCtrl', [
    '$scope',
    'ReportService',
    '$location',
    function ($scope, ReportService, $location) {

      //angular functions

      //private functions
      var retrieveQuarterlySales = function () {
        ReportService.getQuarterlySales().then(function successCallback(response) {
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

      retrieveQuarterlySales();
    }
  ]);

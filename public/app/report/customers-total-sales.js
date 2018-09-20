'use strict';

angular.module('warehouse.customersTotalSales', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'ReportService'
]);

angular.module('warehouse.customersTotalSales').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/customers-total-sales', {
      templateUrl: 'app/report/customers-total-sales.html',
      controller: 'CustomersTotalSalesCtrl'
    });
  }
]);

angular.module('warehouse.customersTotalSales')
  .controller('CustomersTotalSalesCtrl', [
    '$scope',
    'ReportService',
    '$location',
    function ($scope, ReportService, $location) {

      //angular functions

      //private functions
      var retrieveCustomersTotalSales = function () {
        ReportService.getCustomersTotalSales().then(function successCallback(response) {
          $scope.rowCollection = response.data;
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      //init controller
      $scope.rowCollection = [];
      
      retrieveCustomersTotalSales();
    }
  ]);

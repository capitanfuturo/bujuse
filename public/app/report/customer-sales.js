'use strict';

angular.module('warehouse.customerSales', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'ReportService'
]);

angular.module('warehouse.customerSales').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/customer-sales', {
      templateUrl: 'app/report/customer-sales.html',
      controller: 'CustomerSalesCtrl'
    });
  }
]);

angular.module('warehouse.customerSales')
  .controller('CustomerSalesCtrl', [
    '$scope',
    'CustomerService',
    'ReportService',
    '$location',
    function ($scope, CustomerService, ReportService, $location) {

      //angular functions
      $scope.getCustomerSales = function () {
        ReportService.getCustomerSales($scope.customer._id).then(function successCallback(response) {
          $scope.rowCollection = response.data;
        }, function errorCallback(response) {
          console.log(response);
        });
      };
      
      //private functions
      var retrieveCustomers = function () {
        CustomerService.get().then(function successCallback(response) {
          $scope.customers = response.data;
          $scope.customers.sort(compareCustomers);
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      var compareCustomers = function(a, b) {
          if (a.name < b.name)
              return -1;
          if (a.name > b.name)
              return 1;
          return 0;
      };

      //init controller
      $scope.customers = [];
      $scope.customer = {};

      retrieveCustomers();
    }
  ]);

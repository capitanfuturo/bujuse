'use strict';

angular.module('warehouse.yearlySales', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'ReportService'
]);

angular.module('warehouse.yearlySales').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/yearly-sales', {
      templateUrl: 'app/report/yearly-sales.html',
      controller: 'YearlySalesCtrl'
    });
  }
]);

angular.module('warehouse.yearlySales')
  .controller('YearlySalesCtrl', [
    '$scope',
    'ReportService',
    '$location',
    function ($scope, ReportService, $location) {

      //angular functions
      $scope.getYearlySales = function () {
        ReportService.getYearlySales($scope.year).then(function successCallback(response) {
          $scope.rowCollection = response.data;
        }, function errorCallback(response) {
          console.log(response);
        });
      };
      
      //private functions

      //init controller
      $scope.years = ['2017','2018','2019','2020'];
      $scope.year = 2020;
    }
  ]);

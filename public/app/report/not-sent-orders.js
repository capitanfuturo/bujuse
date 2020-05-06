'use strict';

angular.module('warehouse.notSentOrders', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'ReportService',
  'EnumService',
  'SeasonService'
]);

angular.module('warehouse.notSentOrders').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/not-sent-orders', {
      templateUrl: 'app/report/not-sent-orders.html',
      controller: 'NotSentOrdersCtrl'
    });
  }
]);

angular.module('warehouse.notSentOrders')
  .controller('NotSentOrdersCtrl', [
    '$scope',
    'ReportService',
    '$location',
    'SeasonNameService',
    'SeasonService',
    function ($scope, ReportService, $location, SeasonNameService, SeasonService) {

      //angular functions
      
      //private functions
      var retrieveNotSentOrders = function () {
        ReportService.getNotSentOrders().then(function successCallback(response) {
          $scope.rowCollection = response.data;
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      //init controller
      $scope.rowCollection = [];

      retrieveNotSentOrders();
    }
  ]);

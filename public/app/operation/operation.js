'use strict';

angular.module('warehouse.operation', [
  'ngRoute',
  'smart-table',
  'OperationService'
]);

angular.module('warehouse.operation').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/operation', {
      templateUrl: 'app/operation/operation.html',
      controller: 'OperationCtrl'
    });
  }
]);

angular.module('warehouse.operation')
  .controller('OperationCtrl', [
    '$scope',
    'OperationService',
    '$location',
    function($scope, OperationService, $location) {
      //angular functions

      //private functions
      var retrieveOperaion = function() {
        ItemService.get().then(function successCallback(response) {
          console.log(response.data);
          $scope.rowCollection = response.data
        }, function errorCallback(response) {
          console.log(response);
        });
      };


      //init controller
      console.log('init OperationCtrl');
      $scope.rowCollection = [];
      retrieveOperation();
    }
  ]);

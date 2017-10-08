'use strict';

angular.module('warehouse.operation', ['ngRoute', 'OperationService']);

angular.module('warehouse.operation').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/operation', {
      templateUrl: 'app/operation/operation.html',
      controller: 'OperationCtrl'
    });
  }
]);

angular.module('warehouse.operation').controller('OperationCtrl', ['$scope', 'OperationService', function($scope, OperationService) {
  //angular functions
  //private functions
  //init controller
}]);

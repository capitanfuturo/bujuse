'use strict';

angular.module('warehouse.operation', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'EnumService',
  'OperationService'
]);

angular.module('warehouse.operation').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/operation', {
      templateUrl: 'app/operation/operation.html',
      controller: 'OperationCtrl'
    });
  }
]);

angular.module('warehouse.operation')
  .controller('OperationCtrl', [
    '$scope',
    'OperationTypeService',
    'OperationService',
    '$location',
    function ($scope, OperationTypeService, OperationService, $location) {

      //angular functions
      $scope.add = function () {
        $location.path('/add-operation');
      };

      $scope.remove = function (row) {
        var id = row._id;
        OperationService.delete(id).then(function successCallback(response) {
          var index = $scope.rowCollection.indexOf(row);
          if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
          }
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      $scope.$watchCollection('displayedCollection', function (newRows, oldRows) {
        var qtyAmount = 0;
        var amount = 0;
        var size = $scope.displayedCollection.length;
        for (var i = 0; i < size; i++) {
          var operation = $scope.displayedCollection[i];
          qtyAmount = qtyAmount + operation.quantity;
          amount = amount + operation.price;
        }
        $scope.qtyAmount = qtyAmount;
        $scope.amount = amount;
      });

      //private functions
      var retrieveOperation = function () {
        OperationService.get().then(function successCallback(response) {
          $scope.rowCollection = response.data
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      var retrieveTypes = function () {
        $scope.operationTypes = OperationTypeService.get();
      };

      //init controller
      $scope.rowCollection = [];
      $scope.qtyAmount = 0;
      $scope.amount = 0;
      retrieveTypes();
      retrieveOperation();
    }
  ]);

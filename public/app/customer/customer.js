'use strict';

angular.module('warehouse.customer', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'CustomerService'
]);

angular.module('warehouse.customer').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/customer', {
      templateUrl: 'app/customer/customer.html',
      controller: 'CustomerCtrl'
    });
  }
]);

angular.module('warehouse.customer')
  .controller('CustomerCtrl', [
    '$scope',
    'CustomerService',
    '$location',
    function ($scope, CustomerService, $location) {

      //angular functions
      $scope.add = function () {
        $location.path('/add-customer');
      };

      $scope.edit = function (row) {
        var customerId = row._id;
        $location.path('/edit-customer/' + customerId);
      };

      $scope.remove = function (row) {
        var id = row._id;
        CustomerService.delete(id).then(function successCallback(response) {
          var index = $scope.rowCollection.indexOf(row);
          if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
          }
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      //private functions
      var retrieveCustomers = function () {
        CustomerService.get().then(function successCallback(response) {
          $scope.rowCollection = response.data
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      //init controller
      $scope.rowCollection = [];
      retrieveCustomers();
    }
  ]);

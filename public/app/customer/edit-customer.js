'use strict';

angular.module('warehouse.editCustomer', [
  'ngRoute',
  'pascalprecht.translate',
  'CustomerService'
]);

angular.module('warehouse.editCustomer').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/edit-customer/:customerId', {
      templateUrl: 'app/customer/edit-customer.html',
      controller: 'EditCustomerCtrl'
    });
  }
]);

angular.module('warehouse.editCustomer')
  .controller('EditCustomerCtrl', [
    '$scope',
    'CustomerService',
    '$location',
    '$routeParams',
    function ($scope, CustomerService, $location, $routeParams) {

      //angular functions
      $scope.editCustomer = function () {
        console.log($scope.customer);
        CustomerService.update($scope.customer).then(function successCallback(response) {
          console.log('return to customer');
          $location.path('/customer');
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      $scope.hasChanged = function () {
        $scope.addDisabled = !$scope.customer.name;
      }

      $scope.cancel = function () {
        $location.path('/customer');
      };

      //private functions

      //init controller
      var customerId = $routeParams.customerId;
      $scope.addDisabled = true;

      CustomerService.getById(customerId).then(function successCallback(response) {
        $scope.customer = response.data;
        $scope.hasChanged();
      }, function errorCallback(response) {
        console.log(response);
      });
    }
  ]);

'use strict';

angular.module('warehouse.editCustomer', [
  'ngRoute',
  'pascalprecht.translate',
  'EnumService',
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
    'CustomerSizeService',
    'CustomerCategoryService',
    'CustomerGenderService',
    '$location',
    '$routeParams',
    function ($scope, CustomerService, CustomerSizeService, CustomerCategoryService, CustomerGenderService, $location, $routeParams) {

      //angular functions
      $scope.editCustomer = function () {
        console.log($scope.customer);

        $scope.customer.gender = $scope.gender.id;
        $scope.customer.size = $scope.size.id;
        $scope.customer.category = $scope.category.id;

        CustomerService.update($scope.customer).then(function successCallback(response) {
          console.log('return to customer');
          $location.path('/customer');
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      $scope.hasChanged = function () {
        $scope.addDisabled = !$scope.customer.model || !$scope.category.id || !$scope.gender.id || !$scope.size.id || !$scope.customer.price;
      };

      $scope.hasChangedGender = function () {
        $scope.hasChanged();
        $scope.customer.gender = $scope.gender.id;
        retrieveSizes($scope.customer.gender);
      };

      $scope.cancel = function () {
        $location.path('/customer');
      };

      //private functions
      var retrieveCategories = function () {
        $scope.categories = CustomerCategoryService.get();
        $scope.categories.sort(compareEnum);
      };

      var retrieveGenders = function () {
        $scope.genders = CustomerGenderService.get();
        $scope.genders.sort(compareEnum);
      };

      var retrieveSizes = function (gender) {
        $scope.sizes = CustomerSizeService.get(gender);
      };

      var compareEnum = function (a, b) {
        if (a.key < b.key)
          return -1;
        if (a.key > b.key)
          return 1;
        return 0;
      };

      var searchById = function (id, myArray) {
        for (var i = 0; i < myArray.length; i++) {
          if (myArray[i].id == id) {
            return myArray[i];
          }
        }
      };

      //init controller
      var customerId = $routeParams.customerId;

      $scope.category = {};
      $scope.categories = [];
      $scope.gender = {};
      $scope.genders = [];
      $scope.size = {};
      $scope.sizes = [];
      $scope.addDisabled = true;

      retrieveCategories();
      retrieveGenders();

      CustomerService.getById(customerId).then(function successCallback(response) {
        $scope.customer = response.data;
        $scope.category = searchById($scope.customer.category, $scope.categories);
        $scope.gender = searchById($scope.customer.gender, $scope.genders);
        retrieveSizes($scope.gender.id);
        $scope.size = searchById($scope.customer.size, $scope.sizes);

        $scope.hasChanged();
      }, function errorCallback(response) {
        console.log(response);
      });
    }
  ]);

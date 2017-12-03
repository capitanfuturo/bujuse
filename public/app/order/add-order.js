'use strict';

angular.module('warehouse.addOrder', [
  'ngRoute',
  'pascalprecht.translate',
  'EnumService',
  'ItemService',
  'OrderService',
  'CustomerService'
]);

angular.module('warehouse.addOrder').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/add-order', {
      templateUrl: 'app/order/add-order.html',
      controller: 'AddOrderCtrl'
    });
  }
]);

angular.module('warehouse.addOrder')
  .controller('AddOrderCtrl', [
    '$scope',
    '$location',
    'ItemService',
    'CustomerService',
    'ItemGenderService',
    'ItemSizeService',
    'OrderService',
    function ($scope, $location, ItemService, CustomerService, ItemGenderService, ItemSizeService, OrderService) {

      //angular functions
      $scope.createOrder = function () {
        $scope.order.customer = $scope.customer._id;

        var size = $scope.elements.length;
        for (var i = 0; i < size; i++) {
          var element = $scope.elements[i];
          var orderElement = {};
          orderElement.itemId = element.item._id;
          orderElement.itemFullName = getFullname(element.item);
          orderElement.fabric = element.fabric;
          orderElement.quantity = element.quantity;
          orderElement.note = element.note;
          $scope.order.elements.push(orderElement);
        }

        OrderService.create($scope.order).then(function successCallback(response) {
          $location.path('/order');
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      $scope.hasChanged = function () {
        $scope.addDisabled = !$scope.order.creationDate ||
          !$scope.order.customer ||
          $scope.elements.length == 0;
      };

      $scope.hasChangedCustomer = function () {
        $scope.order.customer = $scope.customer._id;
        $scope.hasChanged();
      };

      $scope.addOrderElement = function () {
        $scope.elements.push($scope.element);
        $scope.element = {};
        $scope.element.quantity = 1;
        $scope.hasChanged();
      }

      $scope.removeOrderElement = function (index) {
        $scope.elements.splice(index, 1);
      }

      //private functions
      var retrieveCustomers = function () {
        CustomerService.get().then(function successCallback(response) {
          $scope.customers = response.data;
        }, function errorCallback(response) {
          console.log(response);
        });
      }

      var retrieveGenders = function () {
        $scope.genders = ItemGenderService.get();
      };

      var retrieveSizes = function (gender) {
        $scope.sizes = ItemSizeService.get(gender);
      };

      var retrieveItems = function () {
        ItemService.get().then(function successCallback(response) {
          $scope.items = response.data;
          $scope.items.sort(function (a, b) {
            return (a.model > b.model) ? 1 : ((b.model > a.model) ? -1 : 0);
          });
          var size = $scope.items.length;
          for (var i = 0; i < size; i++) {
            var item = $scope.items[i];
            $scope.items[i].fullname = getFullname(item);
          }

        }, function errorCallback(response) {
          console.log(response);
        });
      };

      var getFullname = function (item) {
        var gender = item.gender;
        var size = item.size;
        for (var i = 0; i < $scope.genders.length; i++) {
          if (gender == $scope.genders[i].id) {
            gender = $scope.genders[i].key;
          }
        }
        for (var i = 0; i < $scope.sizes.length; i++) {
          if (size == $scope.sizes[i].id) {
            size = $scope.sizes[i].key;
          }
        }
        return item.model + " - " + gender + " - " + size;
      };

      //init controller
      $scope.order = {};
      $scope.order.creationDate = new Date();
      $scope.order.elements = [];

      $scope.customers = [];
      $scope.customer = {};

      $scope.items = [];

      $scope.elements = [];
      $scope.element = {};
      $scope.element.quantity = 1;

      $scope.addDisabled = true;

      retrieveSizes();
      retrieveGenders();
      retrieveCustomers();
      retrieveItems();
    }
  ]);

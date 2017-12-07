'use strict';

angular.module('warehouse.editOrder', [
  'ngRoute',
  'pascalprecht.translate',
  'OrderService',
  'EnumService',
  'ItemService',
]);

angular.module('warehouse.editOrder').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/edit-order/:orderId', {
      templateUrl: 'app/order/edit-order.html',
      controller: 'EditOrderCtrl'
    });
  }
]);

angular.module('warehouse.editOrder')
  .controller('EditOrderCtrl', [
    '$scope',
    '$location',
    '$routeParams',
    'OrderService',
    'ItemService',
    'ItemGenderService',
    'ItemSizeService',
    function ($scope, $location, $routeParams, OrderService, ItemService, ItemGenderService, ItemSizeService) {

      //angular functions
      $scope.editOrder = function () {
        $scope.order.customer = $scope.order.customer._id;
        $scope.order.customerName = $scope.order.customer.name;
        $scope.order.elements = $scope.elements;

        OrderService.edit($scope.order).then(function successCallback(response) {
          $location.path('/order');
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      $scope.cancel = function () {
        $location.path('/order');
      };

      $scope.removeOrderElement = function (index) {
        $scope.elements.splice(index, 1);
        adjustAmount();
      };

      $scope.hasChanged = function () {
        $scope.addDisabled = $scope.elements.length == 0;
      };

      $scope.addOrderElement = function () {
        $scope.element.itemFullName = getFullname($scope.element.item);
        $scope.element.itemId = $scope.element.item._id;

        $scope.elements.push($scope.element);
        $scope.element = {};
        $scope.element.quantity = 1;
        adjustAmount();
        $scope.hasChanged();
      };

      $scope.hasChangedDeposit = function () {
        adjustAmount();
      };

      $scope.hasChangedItem = function () {
        $scope.element.price = $scope.element.quantity * $scope.element.item.price;
      };

      $scope.hasChangedQty = function () {
        $scope.element.price = $scope.element.quantity * $scope.element.item.price;
      };

      //private functions
      var adjustAmount = function () {
        var size = $scope.elements.length;
        var amount = 0;
        for (var i = 0; i < size; i++) {
          var element = $scope.elements[i];
          amount = amount + element.price;
        }
        $scope.amount = amount;
        if ($scope.order.deposit) {
          $scope.amount = amount - $scope.order.deposit;
        }
      };

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
      var orderId = $routeParams.orderId;

      $scope.order = {};

      $scope.items = [];

      $scope.elements = [];
      $scope.element = {};
      $scope.element.quantity = 1;

      $scope.addDisabled = false;

      retrieveSizes();
      retrieveGenders();
      retrieveItems();

      OrderService.getById(orderId).then(function successCallback(response) {
        $scope.order = response.data;
        $scope.elements = $scope.order.elements;
        adjustAmount();
      }, function errorCallback(response) {
        console.log(response);
      });
    }
  ]);

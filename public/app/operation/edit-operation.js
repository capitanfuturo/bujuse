'use strict';

angular.module('warehouse.editOperation', [
  'ngRoute',
  'pascalprecht.translate',
  'EnumService',
  'ItemService',
  'OperationService',
  'WarehouseService'
]);

angular.module('warehouse.editOperation').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/edit-operation/:operationId', {
      templateUrl: 'app/operation/edit-operation.html',
      controller: 'EditOperationCtrl'
    });
  }
]);

angular.module('warehouse.editOperation')
  .controller('EditOperationCtrl', [
    '$scope',
    'OperationTypeService',
    'ItemService',
    'WarehouseService',
    'OperationService',
    '$location',
    'ItemSizeService',
    'ItemGenderService',
    '$routeParams',
    function ($scope, OperationTypeService, ItemService, WarehouseService, OperationService,
      $location, ItemSizeService, ItemGenderService, $routeParams) {
      //angular functions
      $scope.editOperation = function () {
        console.log($scope.operation);
        OperationService.update($scope.operation).then(function successCallback(response) {
          console.log('return to operation');
          $location.path('/operation');
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      $scope.hasChanged = function () {
        $scope.addDisabled = !$scope.operation.creationDate ||
          !$scope.operationType ||
          !$scope.warehouse._id ||
          !$scope.item._id ||
          !$scope.operation.quantity;
      };

      $scope.hasChangedWarehouse = function () {
        $scope.operation.warehouse = $scope.warehouse._id;
        $scope.hasChanged();
      };

      $scope.hasChangedItem = function () {
        $scope.operation.item = $scope.item._id;
        adjustPrice();
        $scope.hasChanged();
      };

      $scope.hasChangedQuantity = function () {
        adjustPrice();
        $scope.hasChanged();
      };

      $scope.hasChangedType = function () {
        $scope.operation.type = $scope.operationType.id;
      };

      $scope.cancel = function () {
        $location.path('/operation');
      };

      //private functions
      var retrieveWarehouses = function () {
        WarehouseService.get().then(function successCallback(response) {
          $scope.warehouses = response.data;
          if ($scope.warehouses && $scope.warehouses.length) {
            $scope.warehouse = $scope.warehouses[0];
            $scope.hasChangedWarehouse();
          } else {
            $scope.warehouses.sort(function (a, b) {
              return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            });
          }
        }, function errorCallback(response) {
          console.log(response);
        });
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

          initSelection();
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      var retrieveTypes = function () {
        $scope.operationTypes = OperationTypeService.get();
      };

      var adjustPrice = function () {
        if ($scope.item.price && $scope.operation.quantity) {
          $scope.operation.price = $scope.item.price * $scope.operation.quantity;
        }
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

      var retrieveGenders = function () {
        $scope.genders = ItemGenderService.get();
      };

      var retrieveSizes = function (gender) {
        $scope.sizes = ItemSizeService.get(gender);
      };

      var initSelection = function(){
        var operationId = $routeParams.operationId;
        OperationService.getById(operationId).then(function successCallback(response) {
          $scope.operation = response.data;
          var price = $scope.operation.price;

          // convert data string to a valid data object
          $scope.operation.creationDate = new Date(response.data.creationDate);

          // operation type pre-selection
          var size = $scope.operationTypes.length;
          for (var i = 0; i < size; i++) {
            var type = $scope.operationTypes[i];
            if ($scope.operation.type == type.id) {
              $scope.operationType = type;
              $scope.hasChangedType();
            }
          }

          // item pre-selection
          size = $scope.items.length;
          for (var i = 0; i < size; i++) {
            var item = $scope.items[i];
            if ($scope.operation.item._id == item._id) {
              $scope.item = item;
              $scope.item.fullname = getFullname(item);
              $scope.hasChangedItem();
            }
          }

          // warehouse pre-selection
          size = $scope.warehouses.length;
          for (var i = 0; i < size; i++) {
            var warehouse = $scope.warehouses[i];
            if ($scope.operation.warehouse._id == warehouse._id) {
              $scope.warehouse = warehouse;
              $scope.hasChangedWarehouse();
            }
          }

          // notify data change
          $scope.hasChanged();

          // adjust initial price
          $scope.operation.price = price;
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      //init controller
      $scope.operation = {};
      $scope.operation.creationDate = new Date();
      $scope.operation.quantity = 1;

      $scope.warehouses = [];
      $scope.warehouse = {};

      $scope.items = [];
      $scope.item = {};

      $scope.operationTypes = [];
      $scope.operationType = {};

      $scope.addDisabled = true;

      retrieveSizes();
      retrieveGenders();
      retrieveWarehouses();
      retrieveTypes();
      retrieveItems();
    }
  ]);

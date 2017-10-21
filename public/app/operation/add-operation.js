'use strict';

angular.module('warehouse.addOperation', [
    'ngRoute',
    'pascalprecht.translate',
    'EnumService',
    'ItemService',
    'OperationService',
    'WarehouseService'
]);

angular.module('warehouse.addOperation').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/add-operation', {
            templateUrl: 'app/operation/add-operation.html',
            controller: 'AddOperationCtrl'
        });
    }
]);

angular.module('warehouse.addOperation')
    .controller('AddOperationCtrl', [
        '$scope',
        'OperationTypeService',
        'ItemService',
        'WarehouseService',
        '$location',
        function($scope, OperationTypeService, ItemService, WarehouseService, $location) {

            //angular functions
            $scope.createOperation = function() {
                console.log($scope.operation);
                OperationService.create($scope.operation).then(function successCallback(response) {
                    console.log('return to operation');
                    $location.path('/operation');
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            $scope.hasChanged = function() {
                $scope.addDisabled = !$scope.operation.creationDate || !$scope.warehouse._id || !$scope.item._id || !$scope.operation.price || !$scope.operation.quantity;
            };

            $scope.hasChangedWarehouse = function() {
                $scope.operation.warehouse = $scope.warehouse._id;
                $scope.hasChanged();
            };

            $scope.hasChangedItem = function() {
                $scope.operation.item = $scope.item._id;
                adjustPrice();
                $scope.hasChanged();
            };

            $scope.hasChangedQuantity = function() {
                adjustPrice();
                $scope.hasChanged();
            };

            //private functions
            var retrieveWarehouses = function() {
                WarehouseService.get().then(function successCallback(response) {
                    $scope.warehouses = response.data;
                    $scope.warehouses.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            var retrieveItems = function() {
                ItemService.get().then(function successCallback(response) {
                    $scope.items = response.data;
                    $scope.items.sort(function(a,b) {return (a.model > b.model) ? 1 : ((b.model > a.model) ? -1 : 0);} );
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            var retrieveTypes = function() {
                $scope.operationTypes = OperationTypeService.get();
            }

            var adjustPrice = function() {
                if ($scope.item.price && $scope.operation.quantity) {
                    $scope.operation.price = $scope.item.price * $scope.operation.quantity;
                }

            }

            //init controller
            $scope.operation = {};
            $scope.operation.creationDate = new Date();
            $scope.operation.quantity = 1;

            $scope.warehouses = [];
            $scope.warehouse = {};

            $scope.items = [];
            $scope.item = {};

            $scope.operationTypes = [];

            $scope.addDisabled = true;

            retrieveWarehouses();
            retrieveItems();
            retrieveTypes();

        }
    ]);

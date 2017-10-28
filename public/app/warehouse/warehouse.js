'use strict';

angular.module('warehouse.warehouse', [
    'ngRoute',
    'pascalprecht.translate',
    'smart-table',
    'WarehouseService'
]);

angular.module('warehouse.warehouse').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/warehouse', {
            templateUrl: 'app/warehouse/warehouse.html',
            controller: 'WarehouseCtrl'
        });
    }
]);

angular.module('warehouse.warehouse')
    .controller('WarehouseCtrl', [
        '$scope',
        'WarehouseService',
        '$location',
        function($scope, WarehouseService, $location) {

            //angular functions
            $scope.add = function() {
                $location.path('/add-warehouse');
            };

            $scope.remove = function(row) {
                var id = row._id;
                WarehouseService.delete(id).then(function successCallback(response) {
                    var index = $scope.rowCollection.indexOf(row);
                    if (index !== -1) {
                        $scope.rowCollection.splice(index, 1);
                    }
                }, function errorCallback(response) {
                    console.log(response);
                });
            }

            //private functions
            var retrieveWarehouses = function() {
                WarehouseService.get().then(function successCallback(response) {
                    $scope.rowCollection = response.data
                }, function errorCallback(response) {
                    console.log(response);
                });
            };


            //init controller
            $scope.rowCollection = [];
            retrieveWarehouses();
        }
    ]);

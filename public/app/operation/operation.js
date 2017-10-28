'use strict';

angular.module('warehouse.operation', [
    'ngRoute',
    'pascalprecht.translate',
    'smart-table',
    'OperationService'
]);

angular.module('warehouse.operation').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/operation', {
            templateUrl: 'app/operation/operation.html',
            controller: 'OperationCtrl'
        });
    }
]);

angular.module('warehouse.operation')
    .controller('OperationCtrl', [
        '$scope',
        'OperationService',
        '$location',
        function($scope, OperationService, $location) {

            //angular functions
            $scope.add = function() {
                $location.path('/add-operation');
            };

            $scope.remove = function(row) {
                var id = row._id;
                OperationService.delete(id).then(function successCallback(response) {
                    var index = $scope.rowCollection.indexOf(row);
                    if (index !== -1) {
                        $scope.rowCollection.splice(index, 1);
                    }
                }, function errorCallback(response) {
                    console.log(response);
                });
            }

            //private functions
            var retrieveOperation = function() {
                OperationService.get().then(function successCallback(response) {
                    $scope.rowCollection = response.data
                }, function errorCallback(response) {
                    console.log(response);
                });
            };


            //init controller
            $scope.rowCollection = [];
            retrieveOperation();
        }
    ]);

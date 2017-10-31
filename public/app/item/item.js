'use strict';

angular.module('warehouse.item', [
    'ngRoute',
    'pascalprecht.translate',
    'smart-table',
    'ItemService'
]);

angular.module('warehouse.item').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/item', {
            templateUrl: 'app/item/item.html',
            controller: 'ItemCtrl'
        });
    }
]);

angular.module('warehouse.item')
    .controller('ItemCtrl', [
        '$scope',
        'ItemService',
        '$location',
        function($scope, ItemService, $location) {

            //angular functions
            $scope.add = function() {
                $location.path('/add-item');
            };

            $scope.edit = function(row) {
              var itemId = row._id;
              $location.path('/edit-item/' + itemId);
            }

            $scope.remove = function(row) {
                var id = row._id;
                ItemService.delete(id).then(function successCallback(response) {
                    var index = $scope.rowCollection.indexOf(row);
                    if (index !== -1) {
                        $scope.rowCollection.splice(index, 1);
                    }
                }, function errorCallback(response) {
                    console.log(response);
                });
            }

            //private functions
            var retrieveItem = function() {
                ItemService.get().then(function successCallback(response) {
                    $scope.rowCollection = response.data
                }, function errorCallback(response) {
                    console.log(response);
                });
            };


            //init controller
            $scope.rowCollection = [];
            retrieveItem();

            var protocol = $location.protocol();
            var host = $location.host();
            var port = $location.port();
            $scope.baseUrl = protocol + '://' + host + ':' + port +  '#!/add-operation';
        }
    ]);

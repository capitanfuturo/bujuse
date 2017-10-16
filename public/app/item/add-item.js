'use strict';

angular.module('warehouse.addItem', [
    'ngRoute',
    'pascalprecht.translate',
    'EnumService',
    'ItemService'
]);

angular.module('warehouse.addItem').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/add-item', {
            templateUrl: 'app/item/add-item.html',
            controller: 'AddItemCtrl'
        });
    }
]);

angular.module('warehouse.addItem')
    .controller('AddItemCtrl', [
        '$scope',
        'ItemService',
        'ItemSizeService',
        'ItemCategoryService',
        'ItemGenderService',
        '$location',
        function($scope, ItemService, ItemSizeService, ItemCategoryService, ItemGenderService, $location) {
            //angular functions
            $scope.createItem = function() {
                console.log($scope.item);
                ItemService.create($scope.item).then(function successCallback(response) {
                    console.log('return to item');
                    $location.path('/item');
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            //private functions
            var retrieveCategories = function() {
                $scope.categories = ItemCategoryService.get();
            };

            var retrieveGenders = function() {
                $scope.genders = ItemGenderService.get();
            }

            var retrieveSizes = function(gender) {
                $scope.sizes = ItemSizeService.get(gender);
            }

            //init controller
            $scope.item = {};

            retrieveCategories();
            retrieveGenders();
        }
    ]);

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

                $scope.item.gender = $scope.gender.id;
                $scope.item.size = $scope.size.id;
                $scope.item.category = $scope.category.id;

                ItemService.create($scope.item).then(function successCallback(response) {
                    console.log('return to item');
                    $location.path('/item');
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            $scope.hasChanged = function() {
                $scope.addDisabled = !$scope.item.model || !$scope.category.id || !$scope.gender.id || !$scope.size.id || !$scope.item.price;
            };

            $scope.hasChangedGender = function() {
                $scope.hasChanged();
                $scope.item.gender = $scope.gender.id;
                retrieveSizes($scope.item.gender);
            };

            //private functions
            var retrieveCategories = function() {
                $scope.categories = ItemCategoryService.get();
                $scope.categories.sort(compareEnum);
            };

            var retrieveGenders = function() {
                $scope.genders = ItemGenderService.get();
                $scope.genders.sort(compareEnum);
            }

            var retrieveSizes = function(gender) {
                $scope.sizes = ItemSizeService.get(gender);
            }

            var compareEnum = function(a, b) {
                if (a.key < b.key)
                    return -1;
                if (a.key > b.key)
                    return 1;
                return 0;
            }

            //init controller
            $scope.item = {};
            $scope.category = {};
            $scope.gender = {};
            $scope.size = {};
            $scope.addDisabled = true;

            retrieveCategories();
            retrieveGenders();
        }
    ]);

'use strict';

angular.module('warehouse.editItem', [
    'ngRoute',
    'pascalprecht.translate',
    'EnumService',
    'ItemService'
]);

angular.module('warehouse.editItem').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/edit-item/:itemId', {
            templateUrl: 'app/item/edit-item.html',
            controller: 'EditItemCtrl'
        });
    }
]);

angular.module('warehouse.editItem')
    .controller('EditItemCtrl', [
        '$scope',
        'ItemService',
        'ItemSizeService',
        'ItemCategoryService',
        'ItemGenderService',
        '$location',
        '$routeParams',
        function($scope, ItemService, ItemSizeService, ItemCategoryService, ItemGenderService, $location, $routeParams) {

            //angular functions
            $scope.editItem = function() {
                console.log($scope.item);

                $scope.item.gender = $scope.gender.id;
                $scope.item.size = $scope.size.id;
                $scope.item.category = $scope.category.id;

                ItemService.update($scope.item).then(function successCallback(response) {
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
            };

            var retrieveSizes = function(gender) {
                $scope.sizes = ItemSizeService.get(gender);
            };

            var compareEnum = function(a, b) {
                if (a.key < b.key)
                    return -1;
                if (a.key > b.key)
                    return 1;
                return 0;
            };

            var searchById = function(id, myArray) {
                for (var i = 0; i < myArray.length; i++) {
                    if (myArray[i].id == id) {
                        return myArray[i];
                    }
                }
            };

            $scope.cancel = function(){
              $location.path('/item');
            };

            //init controller
            var itemId = $routeParams.itemId;

            $scope.category = {};
            $scope.categories = [];
            $scope.gender = {};
            $scope.genders = [];
            $scope.size = {};
            $scope.sizes = [];
            $scope.addDisabled = true;

            retrieveCategories();
            retrieveGenders();

            ItemService.getById(itemId).then(function successCallback(response) {
                $scope.item = response.data;
                $scope.category = searchById($scope.item.category, $scope.categories);
                $scope.gender = searchById($scope.item.gender, $scope.genders);
                retrieveSizes($scope.gender.id);
                $scope.size = searchById($scope.item.size, $scope.sizes);

                $scope.hasChanged();
            }, function errorCallback(response) {
                console.log(response);
            });
        }
    ]);

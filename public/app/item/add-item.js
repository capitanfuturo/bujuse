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
        'SeasonService',
        'SeasonNameService',
        '$location',
        function($scope,
          ItemService,
          ItemSizeService,
          ItemCategoryService,
          ItemGenderService,
          SeasonService,
          SeasonNameService,
          $location) {

            //angular functions
            $scope.createItem = function() {
                $scope.item.gender = $scope.gender.id;
                $scope.item.size = $scope.size.id;
                $scope.item.category = $scope.category.id;
                $scope.item.seasons = $scope.elements;

                ItemService.create($scope.item).then(function successCallback(response) {
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

            $scope.getFullname = function (season) {
              var seasonName = season.name;
              for (var i = 0; i < seasonNames.length; i++) {
                if (seasonName == seasonNames[i].id) {
                  seasonName = seasonNames[i].key;
                }
              }
              return seasonName + " " + season.year;
            };

            $scope.addSeason = function () {
              $scope.element.seasonFullName = $scope.getFullname($scope.season);
              $scope.element._id = $scope.season._id;
              $scope.element.name = $scope.season.name;
              $scope.element.year = $scope.season.year;

              $scope.elements.push($scope.element);
              $scope.element = {};

              $scope.hasChanged();
            };

            $scope.removeSeasonElement = function (index) {
              $scope.elements.splice(index, 1);
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

            $scope.cancel = function(){
              $location.path('/item');
            };

            var retrieveSeasonNames = function () {
              seasonNames = SeasonNameService.get();
            }

            var retrieveSeasons = function () {
               SeasonService.get().then(function successCallback(response) {
                $scope.seasons = response.data;
                var size = $scope.seasons.length;
                for (var i = 0; i < size; i++) {
                  var season = $scope.seasons[i];
                  $scope.seasons[i].fullname = $scope.getFullname(season);
                }
              }, function errorCallback(response) {
                console.log(response);
              });
            };

            //init controller
            var seasonNames = [];

            $scope.item = {};
            $scope.category = {};
            $scope.gender = {};
            $scope.size = {};
            $scope.addDisabled = true;

            $scope.season = {};
            $scope.seasons = [];

            $scope.elements = [];
            $scope.element = {};

            retrieveCategories();
            retrieveGenders();
            retrieveSeasonNames();
            retrieveSeasons();
        }
    ]);

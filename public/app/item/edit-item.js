'use strict';

angular.module('warehouse.editItem', [
  'ngRoute',
  'pascalprecht.translate',
  'EnumService',
  'UtilService',
  'ItemService'
]);

angular.module('warehouse.editItem').config(['$routeProvider',
  function ($routeProvider) {
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
    'SeasonService',
    'SeasonNameService',
    'TargetService',
    '$location',
    '$routeParams',
    function ($scope,
      ItemService,
      ItemSizeService,
      ItemCategoryService,
      ItemGenderService,
      SeasonService,
      SeasonNameService,
      TargetService,
      $location,
      $routeParams) {

      //angular functions
      $scope.editItem = function () {
        console.log($scope.item);

        $scope.item.gender = $scope.gender.id;
        $scope.item.size = $scope.size.id;
        $scope.item.category = $scope.category.id;
        $scope.item.seasons = $scope.elements;

        ItemService.update($scope.item).then(function successCallback(response) {
          console.log('return to item');
          $location.path('/item');
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      $scope.hasChanged = function () {
        $scope.addDisabled = !$scope.item.model ||
                            !$scope.category.id ||
                            !$scope.gender.id ||
                            !$scope.size.id ||
                            !$scope.item.price;
      };

      $scope.hasChangedPrice = function () {
        $scope.hasChanged();
        $scope.item.target = TargetService.getTargetPrice($scope.item.price);
      };

      $scope.hasChangedGender = function () {
        $scope.hasChanged();
        $scope.item.gender = $scope.gender.id;
        retrieveSizes($scope.item.gender);
      };

      $scope.cancel = function () {
        $location.path('/item');
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

      $scope.getFullname = function (season) {
        var seasonName = season.name;
        for (var i = 0; i < seasonNames.length; i++) {
          if (seasonName == seasonNames[i].id) {
            seasonName = seasonNames[i].key;
          }
        }
        return seasonName + " " + season.year;
      };

      //private functions
      var retrieveCategories = function () {
        $scope.categories = ItemCategoryService.get();
        $scope.categories.sort(compareEnum);
      };

      var retrieveGenders = function () {
        $scope.genders = ItemGenderService.get();
        $scope.genders.sort(compareEnum);
      };

      var retrieveSizes = function (gender) {
        $scope.sizes = ItemSizeService.get(gender);
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

      var compareEnum = function (a, b) {
        if (a.key < b.key)
          return -1;
        if (a.key > b.key)
          return 1;
        return 0;
      };

      var searchById = function (id, myArray) {
        for (var i = 0; i < myArray.length; i++) {
          if (myArray[i].id == id) {
            return myArray[i];
          }
        }
      };

      //init controller
      var itemId = $routeParams.itemId;
      var seasonNames = [];

      $scope.category = {};
      $scope.categories = [];

      $scope.gender = {};
      $scope.genders = [];

      $scope.size = {};
      $scope.sizes = [];

      $scope.season = {};
      $scope.seasons = [];

      $scope.elements = [];
      $scope.element = {};

      $scope.addDisabled = true;

      retrieveCategories();
      retrieveGenders();
      retrieveSeasonNames();
      retrieveSeasons();

      ItemService.getById(itemId).then(function successCallback(response) {
        $scope.item = response.data;
        $scope.category = searchById($scope.item.category, $scope.categories);
        $scope.gender = searchById($scope.item.gender, $scope.genders);
        retrieveSizes($scope.gender.id);
        $scope.size = searchById($scope.item.size, $scope.sizes);
        $scope.elements = $scope.item.seasons;
        if(!$scope.item.target){
          $scope.item.target = TargetService.getTargetPrice($scope.item.price);
        }

        $scope.hasChanged();
      }, function errorCallback(response) {
        console.log(response);
      });
    }
  ]);

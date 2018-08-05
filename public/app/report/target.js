'use strict';

angular.module('warehouse.target', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'ReportService',
  'EnumService'
]);

angular.module('warehouse.target').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/target', {
      templateUrl: 'app/report/target.html',
      controller: 'TargetCtrl'
    });
  }
]);

angular.module('warehouse.stock')
  .controller('TargetCtrl', [
    '$scope',
    'ReportService',
    'SeasonService',
    'SeasonNameService',
    'ItemCategoryService',
    'ItemGenderService',
    'ItemSizeService',
    '$location',
    function ($scope,
      ReportService,
      SeasonService,
      SeasonNameService,
      ItemCategoryService,
      ItemGenderService,
      ItemSizeService,
      $location) {

      //angular functions
      $scope.getTarget = function () {
        ReportService.getTarget($scope.season._id).then(function successCallback(response) {

          var report = [];

          var size = response.data.length;
          for (var i = 0; i < size; i++) {
            var item = response.data[i];
            item.categoryName = searchById(item.category, $scope.categories).key;
            item.genderName = searchById(item.gender, $scope.genders).key;
            item.sizesName = "";
            var arraySize = item.sizes.length;
            for (var j = 0; j < arraySize; j++) {
              var sizeName = searchById(item.sizes[j], $scope.sizes);
              if(item.sizesName == ""){
                item.sizesName = sizeName.key;
              }else {
                item.sizesName = item.sizesName + "," + sizeName.key;
              }
            }
            report.push(item);
          }

          $scope.rowCollection = report;

        }, function errorCallback(response) {
          console.log(response);
        });
      }

      //private functions
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

      $scope.getFullname = function (season) {
        var seasonName = season.name;
        for (var i = 0; i < seasonNames.length; i++) {
          if (seasonName == seasonNames[i].id) {
            seasonName = seasonNames[i].key;
          }
        }
        return seasonName + " " + season.year;
      };

      var retrieveCategories = function () {
        $scope.categories = ItemCategoryService.get();
      };

      var retrieveGenders = function () {
        $scope.genders = ItemGenderService.get();
      };

      var retrieveSizes = function() {
          $scope.sizes = ItemSizeService.getAll();
      };

      var searchById = function (id, myArray) {
        for (var i = 0; i < myArray.length; i++) {
          if (myArray[i].id == id) {
            return myArray[i];
          }
        }
      };

      //init controller
      var seasonNames = [];
      $scope.rowCollection = [];

      $scope.season = {};
      $scope.seasons = [];

      retrieveCategories();
      retrieveSeasonNames();
      retrieveSeasons();
      retrieveGenders();
      retrieveSizes();
    }
  ]);

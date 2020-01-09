'use strict';

angular.module('warehouse.item', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'ItemService'
]);

angular.module('warehouse.item').config(['$routeProvider',
  function ($routeProvider) {
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
    'SeasonNameService',
    'ItemCategoryService',
    '$translate',
    '$window',
    function ($scope, ItemService, $location, SeasonNameService, ItemCategoryService, $translate, $window) {

      //angular functions
      $scope.add = function () {
        $location.path('/add-item');
      };

      $scope.edit = function (row) {
        var itemId = row._id;
        $location.path('/edit-item/' + itemId);
      };

      $scope.remove = function (row) {
        $translate('CONFIRM_DELETE_ITEM').then(function (confirmText) {
          var confirmed = $window.confirm(confirmText);
          if (confirmed) {
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
        }, function (translationId) {
          console.log(translationId);
        });

      };

      $scope.renderSeasons = function (row) {
        var seasons = row.seasons;
        var size = seasons.length;
        var toDisplay = "";
        for (var i = 0; i < size; i++) {
            var season = seasons[i];
            var translated = "";
            for(var j = 0; j < translatedSeasonNames.length; j++){
              var name = season.name;
              if(name == translatedSeasonNames[j].id){
                translated = translatedSeasonNames[j].key;
              }
            }
            if(size == 1 || i == size-1){
              toDisplay = toDisplay + translated + " " + season.year;
            }else {
              toDisplay = toDisplay + translated + " " + season.year + ", ";
            }
        }
        return toDisplay;
      };

      //private functions
      var retrieveItem = function () {
        ItemService.get().then(function successCallback(response) {
          $scope.rowCollection = response.data;
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      var compareEnums = function (a, b) {
        if (a.key < b.key)
          return -1;
        if (a.key > b.key)
          return 1;
        return 0;
      };

      var retrieveCategories = function () {
        var categories = ItemCategoryService.get();
        categories.sort(compareEnums);
        $scope.categories = categories;
      };

      var retrieveSeasonsNames = function () {
         translatedSeasonNames = SeasonNameService.get();
      };

      //init controller
      $scope.rowCollection = [];
      var translatedSeasonNames = {};

      retrieveCategories();
      retrieveSeasonsNames();

      retrieveItem();

      var protocol = $location.protocol();
      var host = $location.host();
      var port = $location.port();
      $scope.baseLoadUrl = protocol + '://' + host + ':' + port + '#!/add-operation?type=I&itemId=';
      $scope.baseDownloadUrl = protocol + '://' + host + ':' + port + '#!/add-operation?type=O&itemId=';
    }
  ]);

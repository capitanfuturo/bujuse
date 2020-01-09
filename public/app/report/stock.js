'use strict';

angular.module('warehouse.stock', [
  'ngRoute',
  'pascalprecht.translate',
  'smart-table',
  'ReportService',
  'EnumService',
  'SeasonService'
]);

angular.module('warehouse.stock').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/stock', {
      templateUrl: 'app/report/stock.html',
      controller: 'StockCtrl'
    });
  }
]);

angular.module('warehouse.stock')
  .controller('StockCtrl', [
    '$scope',
    'ReportService',
    '$location',
    'SeasonNameService',
    'SeasonService',
    function ($scope, ReportService, $location, SeasonNameService, SeasonService) {

      //angular functions
      $scope.renderSeasons = function (row) {
        var seasons = row.seasons;
        var size = seasons.length;
        var toDisplay = "";
        for (var i = 0; i < size; i++) {
            var season = {}
            var translated = "";
            for(var s = 0; s < allSeasons.length; s++){
              if(seasons[i] == allSeasons[s]._id){
                season = allSeasons[s];
              }
            }

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
      var retrieveStocks = function () {
        ReportService.getStock().then(function successCallback(response) {
          $scope.rowCollection = response.data;
          var qtyAmount = 0;
          var amount = 0;
          if($scope.rowCollection && $scope.rowCollection.length){
            var size = $scope.rowCollection.length;
            for (var i = 0; i < size; i++) {
              var operation = $scope.rowCollection[i];
              qtyAmount = qtyAmount + operation.quantity;
              amount = amount + operation.price;
            }
          }
          $scope.qtyAmount = qtyAmount;
          $scope.amount = amount;
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      var retrieveSeasonsNames = function () {
        translatedSeasonNames = SeasonNameService.get();
      };

      //init controller
      $scope.rowCollection = [];
      $scope.qtyAmount = 0;
      $scope.amount = 0;
      var translatedSeasonNames = {};
      var allSeasons = {};

      retrieveSeasonsNames();
      SeasonService.get().then(function successCallback(response) {
        allSeasons = response.data;
        retrieveStocks();
      }, function errorCallback(response) {
        console.log(response);
      });
    }
  ]);

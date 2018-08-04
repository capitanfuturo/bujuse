'use strict';

angular.module('warehouse.addSeason', [
  'ngRoute',
  'pascalprecht.translate',
  'SeasonService'
]);

angular.module('warehouse.addSeason').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/add-season', {
      templateUrl: 'app/season/add-season.html',
      controller: 'AddSeasonCtrl'
    });
  }
]);

angular.module('warehouse.addSeason')
  .controller('AddSeasonCtrl', [
    '$scope',
    'SeasonService',
    'SeasonNameService',
    '$location',
    function($scope, SeasonService, SeasonNameService, $location) {
      //angular functions
      $scope.createSeason = function() {
        $scope.season.name = $scope.name.id;
        
        console.log($scope.season);
        SeasonService.create($scope.season).then(function successCallback(response) {
          console.log('return to season');
          $location.path('/season');
        }, function errorCallback(response) {
          console.log(response);
        });
      };

      $scope.cancel = function(){
        $location.path('/season');
      };

      //private functions
      var retrieveNames = function() {
          $scope.names = SeasonNameService.get();
      };

      //init controller
      $scope.season = {};
      $scope.season.year = (new Date()).getFullYear();
      $scope.name = {};

      retrieveNames();
    }
  ]);
